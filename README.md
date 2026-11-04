# FrameLock // Standalone Compositor FPS Telemetry for Android

Official landing page and distribution hub for **FrameLock** — the first standalone Android FPS monitor engineered with true `SurfaceFlinger` compositor telemetry. No root, no PC, no Shizuku required.

---

## ⚡ Overview

Most Android FPS monitors read screen refresh rates (always reporting 60Hz/120Hz regardless of game performance) or synthetic Choreographer loops. **FrameLock** taps directly into Android’s `SurfaceFlinger` compositor hardware via local loopback ADB to deliver 100% accurate, true rendered framerates in any game.

- **Direct SurfaceFlinger Telemetry:** Hardware compositor layer inspection, zero synthetic estimates.
- **100% Standalone on Device:** Pairs via Android 11+ Wireless Debugging over `127.0.0.1` loopback.
- **Zero Root & No Shizuku:** Runs under Android UID 2000 shell privileges without modifying system partitions.
- **Sub-1% Resource Footprint:** Lightweight native Kotlin service optimized for zero thermal throttle impact.

---

## 🚀 Live Web Studio & Features

- **Interactive HUD Simulator:** Test the draggable live HUD overlay with realistic frametime waveforms and jitter simulation.
- **Comparative Analysis Table:** Full side-by-side breakdown vs OEM monitors, developer overlays, and PC-tethered profilers.
- **Guided Setup Walkthrough:** Visual 4-step pairing guide with troubleshooting tips.
- **Direct & Cloud Mirror Downloads:** Instant access to the release APK (`FrameLock-v1.0.0-release.apk`).

---

## 📁 Repository Structure

```
Framelock-Webv1.08/
├── assets/
│   ├── css/
│   │   └── style.css          # Futuristic dark-mode aesthetic styling
│   ├── images/
│   │   ├── gameplay-overlay.jpg
│   │   ├── hero-reactor.jpg
│   │   ├── setup-wireless.jpg
│   │   └── split-pairing.jpg
│   └── js/
│       └── main.js            # Interactive HUD demo, frametime canvas, smooth navigation
├── downloads/
│   └── FrameLock-v1.0.0-release.apk  # Official signed release binary (6.37 MB)
├── index.html                 # Complete landing page experience
├── .gitignore
└── README.md
```

---

## 📲 APK Installation & Requirements

- **Android Version:** Android 11+ (API level 30+)
- **Permissions:** Wireless Debugging pairing (`adb pair`)
- **Package:** `FrameLock-v1.0.0-release.apk` (~6.37 MB)

---

## 📄 License

Proprietary / FrameLock Team. All rights reserved.
