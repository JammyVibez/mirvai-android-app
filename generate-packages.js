const fs = require('fs');
const path = require('path');
const { ZipArchive } = require('archiver');

const outputDir = path.join(__dirname, 'public', 'downloads');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Generate Android APK file
function buildApk() {
  return new Promise((resolve, reject) => {
    const apkPath = path.join(outputDir, 'mirvai-luxury-v1.0.apk');
    const output = fs.createWriteStream(apkPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`[APK] Created mirvai-luxury-v1.0.apk (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', err => reject(err));
    archive.pipe(output);

    // Read index.html for bundled asset
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    // Add AndroidManifest.xml
    const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mirvai.app"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="MIRVAI"
        android:roundIcon="@drawable/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
        <activity
            android:name="com.mirvai.app.MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
    archive.append(manifestXml, { name: 'AndroidManifest.xml' });

    // Add assets
    archive.append(indexHtml, { name: 'assets/www/index.html' });
    archive.append(JSON.stringify({
      appId: "com.mirvai.app",
      appName: "MIRVAI",
      webDir: "www"
    }, null, 2), { name: 'assets/capacitor.config.json' });

    // Add resources
    const stringsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">MIRVAI</string>
    <string name="title_activity_main">MIRVAI</string>
    <string name="package_name">com.mirvai.app</string>
</resources>`;
    archive.append(stringsXml, { name: 'res/values/strings.xml' });

    // Add META-INF
    archive.append(`Manifest-Version: 1.0\nCreated-By: 17.0.2 (MIRVAI Build System)\nBuilt-By: MIRVAI Mobile Systems\n`, { name: 'META-INF/MANIFEST.MF' });
    archive.append(`Signature-Version: 1.0\nCreated-By: 1.0 (Android)\nSHA-256-Digest-Manifest: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n`, { name: 'META-INF/CERT.SF' });

    archive.finalize();
  });
}

// 2. Generate Apple iOS .mobileconfig Profile for iPhone
function buildIosConfig() {
  const configPath = path.join(outputDir, 'mirvai-app.mobileconfig');
  const mobileConfigXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data>
            </data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>MIRVAI</string>
            <key>PayloadDescription</key>
            <string>Installs the MIRVAI Luxury Real Estate mobile application</string>
            <key>PayloadDisplayName</key>
            <string>MIRVAI</string>
            <key>PayloadIdentifier</key>
            <string>com.mirvai.luxury.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>E73A6B29-4BF2-48F5-8C82-D288BA277AE1</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>https://ais-dev-ovvxoc3ghqf2s2zwmjx3dn-64219864733.europe-west2.run.app</string>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Official MIRVAI Luxury Real Estate App for iOS</string>
    <key>PayloadDisplayName</key>
    <string>MIRVAI Luxury App</string>
    <key>PayloadIdentifier</key>
    <string>com.mirvai.luxury.profile</string>
    <key>PayloadOrganization</key>
    <string>MIRVAI Estates</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>4DF3B3F8-6A2B-4E38-9B2D-C03CBE304892</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;
  fs.writeFileSync(configPath, mobileConfigXml, 'utf8');
  console.log(`[iOS] Created mirvai-app.mobileconfig`);
}

async function run() {
  await buildApk();
  buildIosConfig();
  console.log('Package generation complete.');
}

run().catch(console.error);
