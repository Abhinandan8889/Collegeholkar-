import os
import zipfile

def create_android_project():
    output_dir = 'public/downloads'
    os.makedirs(output_dir, exist_ok=True)
    zip_path = os.path.join(output_dir, 'Holkar-Science-Android-Studio-Project.zip')
    
    # Load icon data
    icon_bytes = None
    if os.path.exists('public/pwa-192x192.png'):
        with open('public/pwa-192x192.png', 'rb') as f:
            icon_bytes = f.read()

    settings_gradle = """pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "HolkarScienceCollege"
include ':app'
"""

    root_build_gradle = """// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id 'com.android.application' version '8.2.2' apply false
}
"""

    gradle_properties = """org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
"""

    app_build_gradle = """plugins {
    id 'com.android.application'
}

android {
    namespace 'in.edu.holkar.science'
    compileSdk 34

    defaultConfig {
        applicationId "in.edu.holkar.science"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        debug {
            applicationIdSuffix ".debug"
            debuggable true
            minifyEnabled false
        }
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
    implementation 'androidx.webkit:webkit:1.10.0'
}
"""

    proguard_rules = """# Add project specific ProGuard rules here.
-keepattributes *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
"""

    android_manifest = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="in.edu.holkar.science">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher"
        android:supportsRtl="true"
        android:theme="@style/Theme.HolkarScience"
        android:usesCleartextTraffic="true">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:windowSoftInputMode="adjustResize"
            android:theme="@style/Theme.HolkarScience.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
"""

    main_activity = """package in.edu.holkar.science;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import androidx.activity.OnBackPressedCallback;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;
    private SwipeRefreshLayout swipeRefresh;
    private ValueCallback<Uri[]> fileUploadCallback;
    private static final int FILE_CHOOSER_RESULT_CODE = 1001;

    // Production / Deployed App URL or fallback
    private static final String APP_URL = "https://ais-pre-jxczystaj5ozsrbfuxnmai-47882201451.asia-southeast1.run.app";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        swipeRefresh = findViewById(R.id.swipeRefresh);

        setupWebView();
        setupBackNavigation();

        // Disable swipe refresh to prevent touch gesture conflicts and scrolling freeze
        swipeRefresh.setEnabled(false);

        // Load the live autonomous college app
        webView.loadUrl(APP_URL);
    }

    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setUserAgentString(settings.getUserAgentString() + " HolkarAndroidApp/1.0");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
                swipeRefresh.setRefreshing(false);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    return false; // Load inside WebView
                }
                // Handle intent schemes (tel:, mailto:, geo:, etc.)
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                if (newProgress == 100) {
                    progressBar.setVisibility(View.GONE);
                }
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (fileUploadCallback != null) {
                    fileUploadCallback.onReceiveValue(null);
                }
                fileUploadCallback = filePathCallback;

                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_RESULT_CODE);
                } catch (Exception e) {
                    fileUploadCallback = null;
                    return false;
                }
                return true;
            }
        });
    }

    private void setupBackNavigation() {
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_RESULT_CODE) {
            if (fileUploadCallback == null) return;
            Uri[] results = null;
            if (resultCode == RESULT_OK && data != null) {
                String dataString = data.getDataString();
                if (dataString != null) {
                    results = new Uri[]{Uri.parse(dataString)};
                }
            }
            fileUploadCallback.onReceiveValue(results);
            fileUploadCallback = null;
        }
    }
}
"""

    layout_xml = """<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#0F172A">

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="0dp"
        android:layout_height="3dp"
        android:indeterminate="false"
        android:max="100"
        android:progressDrawable="@drawable/progress_bar_custom"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
        android:id="@+id/swipeRefresh"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/progressBar">

        <WebView
            android:id="@+id/webView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
"""

    progress_bar_drawable = """<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@android:id/background">
        <color android:color="#1E293B"/>
    </item>
    <item android:id="@android:id/progress">
        <clip>
            <shape>
                <gradient
                    android:startColor="#38BDF8"
                    android:endColor="#818CF8"
                    android:angle="0" />
            </shape>
        </clip>
    </item>
</layer-list>
"""

    strings_xml = """<resources>
    <string name="app_name">Govt. Holkar Science College</string>
</resources>
"""

    colors_xml = """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary">#0F172A</color>
    <color name="primary_dark">#020617</color>
    <color name="accent">#38BDF8</color>
    <color name="white">#FFFFFF</color>
</resources>
"""

    styles_xml = """<resources>
    <style name="Theme.HolkarScience" parent="Theme.MaterialComponents.DayNight.DarkActionBar">
        <item name="colorPrimary">@color/primary</item>
        <item name="colorPrimaryDark">@color/primary_dark</item>
        <item name="colorAccent">@color/accent</item>
    </style>

    <style name="Theme.HolkarScience.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:statusBarColor">@color/primary_dark</item>
        <item name="android:navigationBarColor">@color/primary_dark</item>
    </style>
</resources>
"""

    readme_md = """# Govt. Holkar Science College Indore - Android App Project

This is the ready-to-build Android Studio project for Govt. Model Autonomous Holkar Science College, Indore.

## How to Build the Debug APK (`app-debug.apk`):

### Option 1: Using Android Studio (Recommended)
1. Open Android Studio.
2. Select **File > Open...** and choose this unzipped project folder.
3. Wait for Gradle Sync to complete.
4. Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. Once completed, click **locate** to find `app-debug.apk` in `app/build/outputs/apk/debug/`.
6. Transfer `app-debug.apk` to any Android phone and install!

### Option 2: Using Command Line (Gradle)
Run in the project directory:
```bash
./gradlew assembleDebug
```
On Windows:
```cmd
gradlew.bat assembleDebug
```
The output APK will be generated at:
`app/build/outputs/apk/debug/app-debug.apk`

---
### Android App Features:
- **Fast Native WebView**: Hardware accelerated, local storage persistent.
- **Pull to Refresh**: Swipe down anywhere to reload live updates and notices.
- **Camera & File Chooser**: Supports photo and document uploads for examination forms and grievances.
- **Deep Linking**: Direct handling of telephone, email, and location intents.
- **Status & Navigation Bar**: Styled in college navy `#020617` with light icons.
"""

    gradle_wrapper_properties = """distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
"""

    build_apk_bat = """@echo off
setlocal

:: Try to find Java from Android Studio or standard JDK paths if JAVA_HOME is not set
if not defined JAVA_HOME (
    if exist "C:\\Program Files\\Android\\Android Studio\\jbr\\bin\\java.exe" (
        set "JAVA_HOME=C:\\Program Files\\Android\\Android Studio\\jbr"
    ) else if exist "C:\\Program Files\\Android\\Android Studio\\jre\\bin\\java.exe" (
        set "JAVA_HOME=C:\\Program Files\\Android\\Android Studio\\jre"
    ) else if exist "%LOCALAPPDATA%\\Programs\\Android Studio\\jbr\\bin\\java.exe" (
        set "JAVA_HOME=%LOCALAPPDATA%\\Programs\\Android Studio\\jbr"
    ) else if exist "C:\\Program Files\\Java\\jdk-17\\bin\\java.exe" (
        set "JAVA_HOME=C:\\Program Files\\Java\\jdk-17"
    )
)

if defined JAVA_HOME (
    set "PATH=%JAVA_HOME%\\bin;%PATH%"
    echo Using Java from: %JAVA_HOME%
)

echo ========================================================
echo Building Holkar Science College Android APK (Debug)...
echo ========================================================
call gradlew.bat assembleDebug
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo SUCCESS: APK Generated Successfully!
    echo Location: app\\build\\outputs\\apk\\debug\\app-debug.apk
    echo ========================================================
    if exist "app\\build\\outputs\\apk\\debug\\app-debug.apk" (
        explorer /select,"app\\build\\outputs\\apk\\debug\\app-debug.apk"
    )
) else (
    echo.
    echo BUILD FAILED. Make sure you have an internet connection and JDK 17.
)
pause
"""

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('settings.gradle', settings_gradle)
        z.writestr('build.gradle', root_build_gradle)
        z.writestr('gradle.properties', gradle_properties)
        z.writestr('README.md', readme_md)
        z.writestr('build-apk.bat', build_apk_bat)
        z.writestr('gradle/wrapper/gradle-wrapper.properties', gradle_wrapper_properties)
        
        # Add wrapper binaries if available
        if os.path.exists('scripts/gradle_wrapper/gradlew'):
            z.write('scripts/gradle_wrapper/gradlew', 'gradlew')
        if os.path.exists('scripts/gradle_wrapper/gradlew.bat'):
            z.write('scripts/gradle_wrapper/gradlew.bat', 'gradlew.bat')
        if os.path.exists('scripts/gradle_wrapper/gradle-wrapper.jar'):
            z.write('scripts/gradle_wrapper/gradle-wrapper.jar', 'gradle/wrapper/gradle-wrapper.jar')

        z.writestr('app/build.gradle', app_build_gradle)
        z.writestr('app/proguard-rules.pro', proguard_rules)
        z.writestr('app/src/main/AndroidManifest.xml', android_manifest)
        z.writestr('app/src/main/java/in/edu/holkar/science/MainActivity.java', main_activity)
        z.writestr('app/src/main/res/layout/activity_main.xml', layout_xml)
        z.writestr('app/src/main/res/drawable/progress_bar_custom.xml', progress_bar_drawable)
        z.writestr('app/src/main/res/values/strings.xml', strings_xml)
        z.writestr('app/src/main/res/values/colors.xml', colors_xml)
        z.writestr('app/src/main/res/values/styles.xml', styles_xml)
        if icon_bytes:
            z.writestr('app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', icon_bytes)
            z.writestr('app/src/main/res/mipmap-hdpi/ic_launcher.png', icon_bytes)
            z.writestr('app/src/main/res/mipmap-mdpi/ic_launcher.png', icon_bytes)

    print(f"Android Project ZIP generated at {zip_path} ({os.path.getsize(zip_path)} bytes)")

if __name__ == '__main__':
    create_android_project()
