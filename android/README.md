# MIRVAI — Native Android App

Real Android application (Kotlin + WebView) for MIRVAI Luxury Real Estate.

This is a **native installable Android app**. It opens the luxury MIRVAI UI full-screen with:
- Custom status bar (deep forest)
- Portrait lock
- Hardware back-button support
- App icon + name **MIRVAI** on the home screen

## Requirements

- [Android Studio](https://developer.android.com/studio) (Ladybug / 2024.2 or newer)
- JDK 17
- Android SDK 34

## How to install on your phone (5 minutes)

1. **Clone the repo**
   ```bash
   git clone https://github.com/JammyVibez/mirvai-android-app.git
   cd mirvai-android-app/android
   ```

2. **Open in Android Studio**
   - File → Open → select the `android` folder
   - Wait for Gradle sync to finish

3. **Run on your phone**
   - Enable **Developer options** + **USB debugging** on your Android phone
   - Plug the phone in via USB
   - Click the green **Run ▶** button (or press Shift+F10)
   - Choose your device → the app installs and launches as **MIRVAI**

## Build an APK you can share

```bash
cd android
./gradlew assembleDebug
```

APK path:
```
app/build/outputs/apk/debug/app-debug.apk
```

Transfer that file to any Android phone and install it (allow “Install from unknown sources” if asked).

## Package info

| Item | Value |
|------|--------|
| Application ID | `com.mirvai.app` |
| App name | MIRVAI |
| Min Android | 7.0 (API 24) |
| Target | API 34 |

## Offline mode (optional)

By default the app loads the live UI from Vercel.  
To make it fully offline, put `index.html`, `css/`, and `js/` into `app/src/main/assets/` and change one line in `MainActivity.kt`:

```kotlin
private val APP_URL = "file:///android_asset/index.html"
```

---

**MIRVAI** — Find. Own. Grow.
