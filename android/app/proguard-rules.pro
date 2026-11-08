# MIRVAI ProGuard rules (keep minimal for WebView app)
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
