import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

function suppressViteWsPlugin(): Plugin {
  return {
    name: 'suppress-vite-ws',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `
(function() {
  if (typeof window === 'undefined') return;
  var OrigWS = window.WebSocket;
  function MockViteWS(url, protocols) {
    var isVite = (
      (typeof protocols === 'string' && protocols.indexOf('vite') !== -1) ||
      (Array.isArray(protocols) && protocols.some(function(p) { return p && p.indexOf('vite') !== -1; })) ||
      (typeof url === 'string' && (url.indexOf('token=') !== -1 || url.indexOf('vite') !== -1 || url.indexOf('24678') !== -1))
    );
    if (!isVite && OrigWS) {
      return new OrigWS(url, protocols);
    }
    var listeners = {};
    var dummy = {
      url: url,
      protocols: protocols,
      readyState: 1,
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
      binaryType: 'blob',
      bufferedAmount: 0,
      extensions: '',
      protocol: typeof protocols === 'string' ? protocols : '',
      send: function() {},
      close: function() {
        dummy.readyState = 3;
        var ev = { type: 'close', wasClean: true, code: 1000, reason: '' };
        if (dummy.onclose) dummy.onclose(ev);
        (listeners['close'] || []).forEach(function(cb) { try { cb(ev); } catch(e) {} });
      },
      addEventListener: function(type, cb) {
        if (!listeners[type]) listeners[type] = [];
        listeners[type].push(cb);
        if (type === 'open') {
          setTimeout(function() {
            var ev = { type: 'open' };
            if (dummy.onopen) dummy.onopen(ev);
            try { cb(ev); } catch(e) {}
          }, 0);
        }
      },
      removeEventListener: function(type, cb) {
        if (listeners[type]) {
          listeners[type] = listeners[type].filter(function(fn) { return fn !== cb; });
        }
      },
      dispatchEvent: function() { return true; },
      onopen: null,
      onclose: null,
      onerror: null,
      onmessage: null
    };
    return dummy;
  }
  if (OrigWS) {
    MockViteWS.CONNECTING = 0;
    MockViteWS.OPEN = 1;
    MockViteWS.CLOSING = 2;
    MockViteWS.CLOSED = 3;
    MockViteWS.prototype = OrigWS.prototype;
  }
  window.WebSocket = MockViteWS;
})();
`
          }
        ];
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      suppressViteWsPlugin(),
      react(),
      tailwindcss(),
      aistudioMediaPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'icon.svg',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
          'logoupdated.png',
          'front_ghsc_new.jpg',
        ],
        manifest: {
          id: '/',
          name: 'Govt. Holkar Science College Indore',
          short_name: 'Holkar Sci',
          description: 'Official Autonomous College & Student Portal for Govt. Model Autonomous Holkar Science College, Indore (M.P.)',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          categories: ['education', 'academic', 'college'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,jpg,jpeg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
