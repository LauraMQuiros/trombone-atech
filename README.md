# ATech Trombone Karaoke

[![ATech](https://img.shields.io/badge/ATech-Hardware-8A2BE2?logo=arduino&logoColor=white)](https://github.com/LauraMQuiros/trombone-atech)
[![PlatformIO](https://img.shields.io/badge/PlatformIO-IDE-FF6C00?logo=platformio)](https://platformio.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Prototype-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)

This is a very small browser prototype that reads a Trombone Champ-style `.tmb` chart and plays an `.ogg` file in sync. The trombone is played using the distance sensor, which controls the pitch and note timing in the experience. The repository also includes a PlatformIO firmware project for the ATech board in the `hardware_project/` folder.

## Demo

Watch the project demo video directly below:

<video controls width="100%" poster="">
  <source src="ATech%20Trombone%20Karaoke.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Clone the repository

```bash
git clone https://github.com/LauraMQuiros/trombone-atech.git
cd trombone-atech
```

## Connect the ATech board with PlatformIO

1. Install VS Code and the PlatformIO IDE extension.
2. Open the repository folder in VS Code.
3. Open the `hardware_project` folder as the PlatformIO project (or use PlatformIO Home and select `hardware_project`).
4. Connect the ATech board to your computer with a USB cable.
5. In the PlatformIO toolbar, choose the correct board/port if prompted, then click Build and Upload.

If you prefer the command line, you can also run the following from the `hardware_project` folder:

```bash
pio run
pio run -t upload
```


Included files:

- `index.html` — game page
- `app.js` — chart parser, renderer, input, and scoring
- `style.css` — simple styling
- `song.tmb` — the uploaded chart
- `song.ogg` — the uploaded audio

## Run it

Best option:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also try opening `index.html` directly. The default chart is embedded into `app.js`, and the audio is loaded as `song.ogg` from the same folder. If browser security blocks local audio, use the local server command above.

## Controls

- Axis: mouse/touch vertical position, W/S, Up/Down, or gamepad left-stick Y
- Button: hold mouse/touch, Space, or any gamepad button
- Match the note line where it crosses the vertical playhead.

## Format assumption

The `.tmb` note format is:

```text
[note position, note length, start pitch, pitch delta, pitch end]
```

The chart uses beats for note position and length, so the prototype converts chart time with:

```text
seconds = beats * 60 / tempo
```

For this upload, the chart title is `Concerning Hobbits`, tempo is `105`, and it contains `275` notes.

## Next things to add

- proper latency calibration screen
- lyric display if the `.tmb` has lyric nodes
- imported chart/song selector
- better scoring windows
- better player instrument sound samples instead of the current simple synth
- menus and results screen
