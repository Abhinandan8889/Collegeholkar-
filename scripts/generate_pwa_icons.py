import zlib
import struct
import math
import os

def parse_png(filename):
    with open(filename, 'rb') as f:
        data = f.read()
    
    assert data[:8] == b'\x89PNG\r\n\x1a\n', "Not a PNG file"
    
    w, h = struct.unpack('>II', data[16:24])
    bit_depth = data[24]
    color_type = data[25]
    
    pos = 8
    idat = b''
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8]
        if ctype == b'IDAT':
            idat += data[pos+8:pos+8+length]
        pos += 12 + length
        
    decompressed = zlib.decompress(idat)
    
    # Reconstruct RGBA
    bpp = 4 # RGBA 8-bit
    stride = w * bpp
    pixels = bytearray(w * h * bpp)
    
    src_pos = 0
    prev_row = bytearray(stride)
    curr_row = bytearray(stride)
    
    for y in range(h):
        filter_type = decompressed[src_pos]
        src_pos += 1
        raw_row = decompressed[src_pos:src_pos+stride]
        src_pos += stride
        
        for x in range(stride):
            filt = raw_row[x]
            left = curr_row[x - bpp] if x >= bpp else 0
            up = prev_row[x]
            up_left = prev_row[x - bpp] if x >= bpp else 0
            
            if filter_type == 0:
                val = filt
            elif filter_type == 1:
                val = (filt + left) & 0xff
            elif filter_type == 2:
                val = (filt + up) & 0xff
            elif filter_type == 3:
                val = (filt + ((left + up) >> 1)) & 0xff
            elif filter_type == 4:
                # Paeth
                p = left + up - up_left
                pa = abs(p - left)
                pb = abs(p - up)
                pc = abs(p - up_left)
                if pa <= pb and pa <= pc:
                    pr = left
                elif pb <= pc:
                    pr = up
                else:
                    pr = up_left
                val = (filt + pr) & 0xff
            else:
                val = filt
                
            curr_row[x] = val
            pixels[y * stride + x] = val
            
        prev_row[:] = curr_row
        
    return w, h, pixels

def save_png(filename, w, h, rgba_pixels):
    stride = w * 4
    raw_data = bytearray()
    for y in range(h):
        raw_data.append(0) # filter type 0 (None)
        raw_data.extend(rgba_pixels[y*stride:(y+1)*stride])
        
    compressed = zlib.compress(raw_data, 9)
    
    out = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    out.extend(struct.pack('>I', 13))
    out.extend(b'IHDR')
    out.extend(ihdr)
    out.extend(struct.pack('>I', zlib.crc32(b'IHDR' + ihdr) & 0xffffffff))
    
    # IDAT
    out.extend(struct.pack('>I', len(compressed)))
    out.extend(b'IDAT')
    out.extend(compressed)
    out.extend(struct.pack('>I', zlib.crc32(b'IDAT' + compressed) & 0xffffffff))
    
    # IEND
    out.extend(struct.pack('>I', 0))
    out.extend(b'IEND')
    out.extend(struct.pack('>I', zlib.crc32(b'IEND') & 0xffffffff))
    
    with open(filename, 'wb') as f:
        f.write(out)
    print(f"Saved {filename} ({w}x{h}, {len(out)} bytes)")

def sample_bilinear(w, h, pixels, u, v):
    # clamp u, v
    u = max(0.0, min(1.0, u))
    v = max(0.0, min(1.0, v))
    x = u * (w - 1)
    y = v * (h - 1)
    x0 = int(math.floor(x))
    y0 = int(math.floor(y))
    x1 = min(x0 + 1, w - 1)
    y1 = min(y0 + 1, h - 1)
    x0 = min(x0, w - 1)
    y0 = min(y0, h - 1)
    
    dx = x - x0
    dy = y - y0
    
    def get_p(px, py):
        idx = (py * w + px) * 4
        if idx + 3 >= len(pixels):
            return (0, 0, 0, 0)
        return (pixels[idx], pixels[idx+1], pixels[idx+2], pixels[idx+3])
        
    p00 = get_p(x0, y0)
    p10 = get_p(x1, y0)
    p01 = get_p(x0, y1)
    p11 = get_p(x1, y1)
    
    res = []
    for i in range(4):
        val = (p00[i]*(1-dx)*(1-dy) + p10[i]*dx*(1-dy) + p01[i]*(1-dx)*dy + p11[i]*dx*dy)
        res.append(int(round(val)))
    return tuple(res)

def resize_image(src_w, src_h, src_pixels, target_w, target_h, pad_ratio=0.0, bg_color=(15, 23, 42, 255)):
    # If pad_ratio > 0, logo occupies (1 - 2*pad_ratio) of target dimensions, centered
    dst = bytearray(target_w * target_h * 4)
    content_w = target_w * (1.0 - 2.0 * pad_ratio)
    content_h = target_h * (1.0 - 2.0 * pad_ratio)
    offset_x = target_w * pad_ratio
    offset_y = target_h * pad_ratio
    
    for y in range(target_h):
        for x in range(target_w):
            # Check if inside padded area
            if offset_x <= x < offset_x + content_w and offset_y <= y < offset_y + content_h:
                u = (x - offset_x) / (content_w - 1) if content_w > 1 else 0.5
                v = (y - offset_y) / (content_h - 1) if content_h > 1 else 0.5
                rgba = sample_bilinear(src_w, src_h, src_pixels, u, v)
                
                # Blend with bg if transparent
                alpha = rgba[3] / 255.0
                if alpha < 1.0 and bg_color:
                    r = int(rgba[0] * alpha + bg_color[0] * (1.0 - alpha))
                    g = int(rgba[1] * alpha + bg_color[1] * (1.0 - alpha))
                    b = int(rgba[2] * alpha + bg_color[2] * (1.0 - alpha))
                    a = 255
                    rgba = (r, g, b, a)
            else:
                rgba = bg_color if bg_color else (0, 0, 0, 0)
                
            idx = (y * target_w + x) * 4
            dst[idx] = rgba[0]
            dst[idx+1] = rgba[1]
            dst[idx+2] = rgba[2]
            dst[idx+3] = rgba[3]
            
    return dst

def main():
    src_file = 'public/logoupdated.png'
    print(f"Loading {src_file}...")
    w, h, pixels = parse_png(src_file)
    print(f"Parsed {w}x{h} PNG successfully.")
    
    # 1. 192x192 PWA Icon
    img_192 = resize_image(w, h, pixels, 192, 192, pad_ratio=0.04, bg_color=(15, 23, 42, 255))
    save_png('public/pwa-192x192.png', 192, 192, img_192)
    
    # 2. 512x512 PWA Icon (Any)
    img_512 = resize_image(w, h, pixels, 512, 512, pad_ratio=0.04, bg_color=(15, 23, 42, 255))
    save_png('public/pwa-512x512.png', 512, 512, img_512)
    
    # 3. 512x512 PWA Maskable Icon (Safe zone margin 15% as mandated by skill)
    img_maskable = resize_image(w, h, pixels, 512, 512, pad_ratio=0.15, bg_color=(15, 23, 42, 255))
    save_png('public/pwa-maskable-512x512.png', 512, 512, img_maskable)
    
    # 4. Apple Touch Icon 180x180 (iOS Safari requirement)
    img_apple = resize_image(w, h, pixels, 180, 180, pad_ratio=0.05, bg_color=(15, 23, 42, 255))
    save_png('public/apple-touch-icon.png', 180, 180, img_apple)
    
    print("All PWA icons generated successfully!")

if __name__ == '__main__':
    main()
