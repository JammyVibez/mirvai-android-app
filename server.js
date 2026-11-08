const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from workspace root and public folder
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Android APK Direct Download Endpoint
app.get('/download/android', (req, res) => {
  const apkPath = path.join(__dirname, 'public', 'downloads', 'mirvai-luxury-v1.0.apk');
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="mirvai-luxury.apk"');
  res.sendFile(apkPath);
});

// Dedicated Standalone Landing Page for Downloading Mobile App
app.get(['/download', '/install', '/get-app'], (req, res) => {
  res.sendFile(path.join(__dirname, 'download.html'));
});

// iOS Profile Direct Download Endpoint
app.get('/download/ios', (req, res) => {
  const iosPath = path.join(__dirname, 'public', 'downloads', 'mirvai-app.mobileconfig');
  res.setHeader('Content-Type', 'application/x-apple-aspen-config');
  res.setHeader('Content-Disposition', 'attachment; filename="mirvai.mobileconfig"');
  res.sendFile(iosPath);
});

// App version and metadata info
app.get('/api/app-info', (req, res) => {
  res.json({
    name: "MIRVAI Luxury Real Estate",
    version: "1.0.4",
    build: 140,
    android: {
      package: "com.mirvai.app",
      minSdk: "Android 8.0 (Oreo)+",
      targetSdk: "Android 14 (API 34)",
      size: "18.4 MB",
      downloadUrl: "/download/android",
      verified: true,
      playProtectCompatible: true
    },
    ios: {
      bundleId: "com.mirvai.luxury.app",
      minVersion: "iOS 14.0+",
      downloadUrl: "/download/ios",
      webClipSupported: true,
      verified: true
    }
  });
});

// Fallback to index.html for any unhandled routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
