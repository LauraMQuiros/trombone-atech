# Tiny Toot Karaoke Prototype

This is a very small browser prototype that reads a Trombone Champ-style `.tmb` chart and plays an `.ogg` file in sync.

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
