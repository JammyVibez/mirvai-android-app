# MIRVAI — Native Android App

Real Android application (Kotlin + WebView) for MIRVAI Luxury Real Estate.

The full luxury UI lives inside the app as local assets and runs offline.  
Looks and feels like a native app with status bar theming, portrait lock, and back-button support.

## Requirements

- Android Studio Ladybug (2024.2) or newer
- JDK 17
- Android SDK 34

## Open & Run

1. Clone the repo (or open the `android/` folder).
2. Open the project in **Android Studio**.
3. Let Gradle sync finish.
4. Connect a phone (USB debugging on) or start an emulator.
5. Click **Run ▶** (or `Shift+F10`).

The app will install as **MIRVAI** on the device.

## Build a release APK

```bash
./gradlew assembleRelease
```

APK location:

```
app/build/outputs/apk/release/app-release-unsigned.apk
```

Sign it with your keystore before uploading to Google Play.

## Project structure

```
android/
├── app/
│   ├── src/main/
│   │   ├── assets/          ← MIRVAI web UI (index.html, css, js)
│   │   ├── java/.../MainActivity.kt
│   │   ├── res/
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
├── build.gradle.kts
├── settings.gradle.kts
└── gradle/
```

## Package

- Application ID: `com.mirvai.app`
- Min SDK: 24 (Android 7.0)
- Target SDK: 34

---

**MIRVAI** — Find. Own. Grow.
