# Android WebView Wrapper (minimal)

Use this as a starting point for a simple native shell that loads the MIRVAI web app.

## Quick path (recommended)

Prefer **Capacitor** from the main README — it gives you plugins, splash screen, status bar control and easier Play Store packaging.

## Manual WebView steps

1. Create a new Empty Activity project in Android Studio (Kotlin, minSdk 24).
2. In `activity_main.xml` replace content with a full-screen WebView.
3. In `MainActivity.kt`:

```kotlin
webView.settings.javaScriptEnabled = true
webView.settings.domStorageEnabled = true
webView.loadUrl("https://your-hosted-mirvai-url.com")
// or loadUrl("file:///android_asset/index.html") after copying assets
```

4. Add internet permission in AndroidManifest.xml if loading remote.
5. For offline assets, place the entire `mirvai_app` contents into `src/main/assets/`.

This keeps the luxury UI identical while giving you a native installable APK.
