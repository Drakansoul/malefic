# malefic

![A screenshot of malefic in Browsingway](https://fxdiscord.com/i/rm144z5j.png)

An overlay that implements FF Logs meters. This is **not** intended to replace your original overlay, more adding to it for precise viewing of rDPS and such. I personally use it with [kagerou](https://github.com/hibiyasleep/kagerou).

## Installation

Use this URL in [OverlayPlugin](https://github.com/OverlayPlugin/OverlayPlugin)/[Browsingway](https://github.com/Styr1x/Browsingway) (Browsingway recommended):

```text
https://malefic.n2.pm/?OVERLAY_WS=ws://127.0.0.1:10501/ws
```

To set the default view, add `&damageType=rDPS` to the end of the URL.

## Why?

The original FF Logs meters do not work with OverlayPlugin/Browsingway, instead relying on reading the streamed log file live. You *must* keep the FF Logs Uploader (or its worse Overwolf successor) open at all times, which uses over a gigabyte of RAM on my machine (compared to Browsingway using ~200 MB for the CEF process). The overlay is also a separate window, which cannot be integrated into the game view (e.g. with Browsingway) and instead floats above it.

## How?

The FF Logs Uploader is an Electron app. The uploader loads a webpage which loads a heavily obfuscated parser script. This script is served by a proxy (which really could be done clientside because of misconfigured CORS, but I chose not to for the sake of minimizing CDN usage).

Despite being heavily obfuscated, the external API interface is extremely simple to use, taking in raw log lines (provided by OverlayPlugin) and then exporting objects of DPS meters. A simple set of formulas (extracted from the uploader) can be used to calculate the FF Logs-specific damage numbers.

This means that, while the UI is entirely custom in SvelteKit, the parsing backend is still FF Logs code. This should ensure authenticity with what the original uploader would display.

## Disclaimer

As most projects I make, I don't actually care about parsing. I originally had no intentions to publish this work, but my friends wanted to use this when I showed it to them, so I polished it into the minimum viable product.

It is unknown if I will maintain this, and things may break at any moment. Damage numbers may be wrong in some scenarios. You have been warned.
