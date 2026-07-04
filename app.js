
(() => {
  "use strict";

  // This is a tiny Trombone Champ / SingStar-style prototype.
  // It reads a Trombone Champ .tmb JSON chart and syncs gameplay to an OGG audio element.

  const DEFAULT_CHART = {"notes":[[3.875,0.375,-165.0,0,-165.0],[4.875,0.375,-68.75,0,-68.75],[5.875,0.375,0.0,0,0.0],[6.875,0.375,-68.75,0,-68.75],[7.875,0.375,-165.0,0,-165.0],[8.875,0.375,-68.75,0,-68.75],[9.875,0.375,0.0,0,0.0],[12.0,0.375,0.0,27.5,27.5],[12.375,0.375,27.5,27.5,55.0],[12.75,0.625,55.0,0,55.0],[13.625,0.625,96.25,0,96.25],[14.5,1.0,55.0,0,55.0],[15.625,0.125,27.5,27.5,55.0],[15.75,0.125,55.0,-27.5,27.5],[15.875,0.5,27.5,-27.5,0.0],[16.375,1.875,0.0,0,0.0],[18.875,0.125,41.25,13.75,55.0],[19.0,0.625,55.0,41.25,96.25],[19.625,0.625,96.25,0,96.25],[20.75,1.0,123.75,0,123.75],[22.0,0.375,165.0,-13.75,151.25],[22.375,1.125,151.25,0,151.25],[23.75,0.5,96.25,-41.25,55.0],[24.25,1.125,55.0,0,55.0],[25.625,0.375,68.75,-13.75,55.0],[26.0,0.375,55.0,-27.5,27.5],[26.375,0.75,27.5,0,27.5],[28.0,0.25,0.0,27.5,27.5],[28.25,0.25,27.5,27.5,55.0],[28.5,0.75,55.0,0,55.0],[29.5,0.75,96.25,0,96.25],[30.492,0.258,55.0,-27.5,27.5],[30.75,0.5,27.5,0,27.5],[31.5,0.75,0.0,27.5,27.5],[32.25,0.25,27.5,-27.5,0.0],[32.5,2.245,0.0,0,0.0],[34.978,0.147,41.25,13.75,55.0],[35.125,1.0,55.0,41.25,96.25],[36.125,1.0,96.25,27.5,123.75],[37.125,1.125,123.75,0,123.75],[38.5,0.625,96.25,0,96.25],[39.5,0.875,55.0,41.25,96.25],[40.375,0.25,96.25,-41.25,55.0],[40.625,1.27,55.0,0,55.0],[42.375,1.5,27.5,0,27.5],[44.25,0.25,0.0,27.5,27.5],[44.5,0.25,27.5,-27.5,0.0],[44.75,5.375,0.0,0,0.0],[52.375,0.25,0.0,27.5,27.5],[52.625,0.25,27.5,27.5,55.0],[52.875,0.25,55.0,0,55.0],[54.875,0.25,55.0,0,55.0],[55.875,0.25,55.0,0,55.0],[56.375,0.125,96.25,27.5,123.75],[56.5,0.125,123.75,-27.5,96.25],[56.625,0.25,96.25,-68.75,27.5],[56.875,0.25,27.5,0,27.5],[57.375,0.5,0.0,27.5,27.5],[57.875,0.875,27.5,0,27.5],[60.484,0.266,-68.75,27.5,-41.25],[60.75,0.25,-41.25,27.5,-13.75],[61.0,0.234,-13.75,0,-13.75],[61.99,0.125,-27.5,13.75,-13.75],[62.115,0.625,-13.75,0,-13.75],[63.0,0.25,0.0,0,0.0],[64.0,0.25,-41.25,0,-41.25],[64.5,1.0,-110.0,0,-110.0],[66.0,0.25,-68.75,0,-68.75],[66.625,1.125,-137.5,0,-137.5],[69.644,0.231,-68.75,0,-68.75],[70.125,0.25,-13.75,0,-13.75],[70.609,0.266,0.0,27.5,27.5],[70.875,0.25,27.5,27.5,55.0],[71.125,0.375,55.0,0,55.0],[72.125,0.375,55.0,0,55.0],[74.075,0.241,96.25,0,96.25],[74.561,0.189,55.0,13.75,68.75],[74.75,0.125,68.75,-13.75,55.0],[74.875,0.25,55.0,-27.5,27.5],[75.125,0.375,27.5,0,27.5],[76.125,0.311,0.0,0,0.0],[76.75,0.375,27.5,-41.25,-13.75],[77.125,0.5,-13.75,0,-13.75],[78.125,0.125,-13.75,13.75,0.0],[78.25,0.25,0.0,-13.75,-13.75],[78.5,0.125,-13.75,-27.5,-41.25],[78.625,2.75,-41.25,0,-41.25],[81.991,0.259,55.0,68.75,123.75],[82.25,0.25,123.75,27.5,151.25],[82.5,0.241,151.25,13.75,165.0],[82.741,1.134,165.0,0,165.0],[84.241,1.624,151.25,0,151.25],[86.25,0.5,96.25,-41.25,55.0],[86.75,1.0,55.0,0,55.0],[88.25,0.25,68.75,-13.75,55.0],[88.5,0.25,55.0,-27.5,27.5],[88.75,1.0,27.5,0,27.5],[90.25,0.25,0.0,27.5,27.5],[90.5,0.25,27.5,27.5,55.0],[90.75,3.0,55.0,0,55.0],[94.25,0.25,55.0,13.75,68.75],[94.5,0.25,68.75,27.5,96.25],[94.75,1.5,96.25,0,96.25],[96.875,1.0,27.5,0,27.5],[98.75,0.25,0.0,27.5,27.5],[99.0,0.25,27.5,27.5,55.0],[99.25,0.391,55.0,0,55.0],[101.25,0.375,55.0,0,55.0],[102.25,0.25,55.0,0,55.0],[102.75,0.25,27.5,27.5,55.0],[103.0,0.25,55.0,27.5,82.5],[103.25,0.375,82.5,0,82.5],[104.25,0.375,82.5,0,82.5],[105.375,0.375,82.5,0,82.5],[106.375,0.25,82.5,0,82.5],[107.0,0.21,55.0,27.5,82.5],[107.21,0.258,82.5,27.5,110.0],[107.468,1.032,110.0,0,110.0],[108.875,0.25,110.0,0,110.0],[109.375,0.375,110.0,0,110.0],[110.308,0.108,110.0,0,110.0],[110.573,0.127,110.0,0,110.0],[110.835,3.29,110.0,0,110.0],[115.0,7.375,0.0,0,0.0],[123.5,6.5,-41.25,0,-41.25],[131.172,0.703,-96.25,0,-96.25],[132.125,0.625,-41.25,0,-41.25],[133.25,0.919,68.75,-13.75,55.0],[134.169,0.875,55.0,-27.5,27.5],[135.044,3.5,27.5,0,27.5],[140.0,0.5,0.0,0,0.0],[141.0,0.375,96.25,0,96.25],[142.0,0.375,96.25,0,96.25],[144.0,0.5,-68.75,0,-68.75],[145.092,0.283,27.5,0,27.5],[145.978,0.272,27.5,0,27.5],[148.0,0.375,-41.25,0,-41.25],[149.0,0.375,0.0,0,0.0],[150.0,0.375,0.0,0,0.0],[152.056,0.375,-96.25,0,-96.25],[153.056,0.375,-41.25,0,-41.25],[154.056,0.625,-13.75,0,-13.75],[156.125,0.5,0.0,0,0.0],[157.125,0.5,96.25,0,96.25],[158.125,0.5,96.25,0,96.25],[160.125,0.5,-68.75,0,-68.75],[161.183,0.375,27.5,0,27.5],[162.16,0.34,27.5,0,27.5],[164.25,0.375,-41.25,0,-41.25],[165.25,0.375,0.0,0,0.0],[166.25,0.375,0.0,0,0.0],[168.25,0.375,-96.25,0,-96.25],[169.25,0.375,-41.25,0,-41.25],[170.25,0.375,-68.75,0,-68.75],[171.192,0.5,-13.75,0,-13.75],[172.25,0.5,0.0,0,0.0],[173.25,0.5,55.0,0,55.0],[174.25,0.25,0.0,0,0.0],[174.811,0.375,55.0,0,55.0],[176.25,0.875,123.75,0,123.75],[178.75,0.25,-110.0,0,-110.0],[179.306,0.253,-41.25,0,-41.25],[179.75,0.26,-13.75,0,-13.75],[180.25,0.5,0.0,0,0.0],[181.25,0.5,-68.75,0,-68.75],[182.303,0.5,0.0,0,0.0],[183.315,0.435,-68.75,0,-68.75],[184.25,0.375,27.5,0,27.5],[186.327,0.25,27.5,27.5,55.0],[186.577,0.25,55.0,13.75,68.75],[186.827,1.423,68.75,0,68.75],[188.5,0.25,0.0,27.5,27.5],[188.75,0.25,27.5,27.5,55.0],[189.0,1.125,55.0,0,55.0],[190.5,1.125,96.25,0,96.25],[192.0,0.25,55.0,41.25,96.25],[192.25,0.25,96.25,27.5,123.75],[192.5,1.875,123.75,0,123.75],[195.75,0.25,55.0,68.75,123.75],[196.0,0.25,123.75,27.5,151.25],[196.25,0.25,151.25,13.75,165.0],[196.5,1.25,165.0,0,165.0],[198.0,1.375,151.25,0,151.25],[199.875,0.375,96.25,0,96.25],[200.5,1.25,55.0,0,55.0],[202.0,0.25,68.75,-13.75,55.0],[202.25,0.25,55.0,-27.5,27.5],[202.5,1.125,27.5,0,27.5],[204.0,0.25,55.0,-27.5,27.5],[204.25,0.25,27.5,0,27.5],[204.625,0.625,0.0,0,0.0],[205.625,0.625,0.0,0,0.0],[208.619,0.25,0.0,27.5,27.5],[208.869,0.25,27.5,27.5,55.0],[209.119,0.25,55.0,0,55.0],[211.119,0.25,55.0,0,55.0],[212.119,0.25,55.0,0,55.0],[212.619,0.125,96.25,27.5,123.75],[212.744,0.125,123.75,-27.5,96.25],[212.869,0.262,96.25,-68.75,27.5],[213.131,0.244,27.5,0,27.5],[213.619,0.5,0.0,27.5,27.5],[214.119,0.875,27.5,0,27.5],[216.603,0.266,-68.75,27.5,-41.25],[216.869,0.25,-41.25,27.5,-13.75],[217.119,0.234,-13.75,0,-13.75],[218.108,0.125,-27.5,13.75,-13.75],[218.233,0.625,-13.75,0,-13.75],[219.119,0.25,0.0,0,0.0],[220.119,0.25,-41.25,0,-41.25],[220.619,1.0,-110.0,0,-110.0],[222.119,0.25,-68.75,0,-68.75],[222.625,0.875,-137.5,0,-137.5],[224.0,0.25,-110.0,0,-110.0],[224.625,0.625,-165.0,0,-165.0],[225.625,0.875,-165.0,0,-165.0],[227.625,0.5,55.0,41.25,96.25],[228.125,0.25,96.25,0,96.25],[228.625,0.5,151.25,0,151.25],[229.75,0.375,27.5,0,27.5],[230.727,0.5,27.5,0,27.5],[232.817,0.375,-41.25,0,-41.25],[233.817,0.375,0.0,0,0.0],[234.817,0.5,0.0,0,0.0],[236.817,0.375,-96.25,0,-96.25],[237.817,0.375,-41.25,0,-41.25],[238.817,0.5,-68.75,0,-68.75],[239.758,0.5,-13.75,0,-13.75],[241.0,0.375,0.0,27.5,27.5],[241.375,0.375,27.5,27.5,55.0],[241.75,0.875,55.0,0,55.0],[243.0,1.0,96.25,0,96.25],[244.25,0.375,55.0,-27.5,27.5],[244.625,0.125,27.5,27.5,55.0],[244.75,0.75,55.0,0,55.0],[246.0,0.125,27.5,27.5,55.0],[246.125,0.125,55.0,-27.5,27.5],[246.25,0.125,27.5,-27.5,0.0],[246.375,2.375,0.0,0,0.0],[249.722,0.125,41.25,13.75,55.0],[249.847,1.278,55.0,0,55.0],[251.375,1.25,96.25,0,96.25],[252.875,1.5,123.75,0,123.75],[254.625,1.0,165.0,-13.75,151.25],[255.625,0.875,151.25,0,151.25],[256.75,0.75,96.25,-41.25,55.0],[257.5,1.625,55.0,0,55.0],[259.5,0.25,68.75,-13.75,55.0],[259.75,0.375,55.0,-27.5,27.5],[260.125,1.875,27.5,0,27.5],[262.375,0.375,0.0,27.5,27.5],[262.75,0.375,27.5,27.5,55.0],[263.125,0.875,55.0,0,55.0],[264.375,1.125,96.25,0,96.25],[265.75,0.25,55.0,-27.5,27.5],[266.0,0.75,27.5,0,27.5],[267.125,1.0,0.0,0,0.0],[268.375,0.375,27.5,-27.5,0.0],[268.75,2.75,0.0,0,0.0],[271.847,0.125,41.25,13.75,55.0],[271.972,1.153,55.0,0,55.0],[273.375,1.5,96.25,27.5,123.75],[274.875,2.0,123.75,-27.5,96.25],[276.875,0.125,96.25,27.5,123.75],[277.0,0.125,123.75,-27.5,96.25],[277.125,0.875,96.25,0,96.25],[278.375,1.125,55.0,13.75,68.75],[279.5,0.125,68.75,-13.75,55.0],[279.625,2.25,55.0,0,55.0],[282.25,0.25,27.5,27.5,55.0],[282.5,0.125,55.0,-27.5,27.5],[282.625,2.25,27.5,0,27.5],[285.25,0.25,0.0,27.5,27.5],[285.5,0.25,27.5,-27.5,0.0],[285.75,9.0,0.0,0,0.0]],"name":"Concerning Hobbits","shortName":"Concerning Hobbits","trackRef":"Concerning Hobbits","year":2001,"author":"Howard Shore","genre":"OST","description":"\"One brass to rule them all... and in dootness bind them.\" - J.R.R. Tolkien","difficulty":5,"savednotespacing":220,"endpoint":298,"timesig":2,"tempo":105,"lyrics":[],"UNK1":0};

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const audio = document.getElementById("songAudio");

  const els = {
    startBtn: document.getElementById("startBtn"),
    pauseBtn: document.getElementById("pauseBtn"),
    restartBtn: document.getElementById("restartBtn"),
    tmbInput: document.getElementById("tmbInput"),
    oggInput: document.getElementById("oggInput"),
    offsetMs: document.getElementById("offsetMs"),
    offsetValue: document.getElementById("offsetValue"),
    calibration: document.getElementById("calibration"),
    songTitle: document.getElementById("songTitle"),
    meta: document.getElementById("meta"),
    score: document.getElementById("score"),
    combo: document.getElementById("combo"),
    acc: document.getElementById("acc"),
    grade: document.getElementById("grade"),
    status: document.getElementById("status"),
    controls: document.getElementById("controls"),
    debug: document.getElementById("debug")
  };

  const state = {
    rawChart: null,
    notes: [],
    bpm: 120,
    beatSeconds: 0.5,
    minPitch: -165,
    maxPitch: 165,
    axis01: 0.5,       // 0 top, 1 bottom
    axisFromKeyboard: 0.5,
    buttonDown: false,
    mouseButtonDown: false,
    keyboardButtonDown: false,
    gamepadButtonDown: false,
    gamepadConnected: false,
    score: 0,
    possibleScore: 0,
    hitScore: 0,
    combo: 0,
    maxCombo: 0,
    judgedSamples: 0,
    activeNoteIndex: 0,
    lastFrameTime: performance.now(),
    running: false,
    noteHits: new Map(),
    pitchTolerance: 28,
    lookAheadSeconds: 6.0,
    pixelsPerSecond: 230,
    playheadX: 185,
    audioLatencySec: 0,
    synthCtx: null,
    synthOsc: null,
    synthGain: null
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function invLerp(a, b, v) { return (v - a) / (b - a); }
  function fmtTime(t) {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function chartBeatToSeconds(beat) {
    return beat * state.beatSeconds;
  }

  function pitchToY(pitch) {
    const padTop = 60;
    const padBottom = 70;
    const usable = canvas.height - padTop - padBottom;
    const t = invLerp(state.minPitch, state.maxPitch, pitch);
    return padTop + (1 - clamp(t, 0, 1)) * usable;
  }

  function axisToPitch(axis01) {
    // axis01 = 0 at top, 1 at bottom. Higher screen position = higher pitch.
    return lerp(state.maxPitch, state.minPitch, clamp(axis01, 0, 1));
  }

  function loadChart(chart) {
    if (!chart || !Array.isArray(chart.notes)) {
      throw new Error("Chart has no notes array.");
    }
    state.rawChart = chart;
    state.bpm = Number(chart.tempo || 120);
    state.beatSeconds = 60 / state.bpm;

    state.notes = chart.notes.map((n, i) => {
      const startBeat = Number(n[0]);
      const lengthBeat = Number(n[1]);
      const startPitch = Number(n[2]);
      const pitchDelta = Number(n[3]);
      const endPitch = Number(n[4]);
      return {
        i,
        startBeat,
        lengthBeat,
        startSec: chartBeatToSeconds(startBeat),
        endSec: chartBeatToSeconds(startBeat + lengthBeat),
        lengthSec: chartBeatToSeconds(lengthBeat),
        startPitch,
        pitchDelta,
        endPitch: isFinite(endPitch) ? endPitch : startPitch + pitchDelta
      };
    }).filter(n => isFinite(n.startSec) && isFinite(n.endSec));

    state.notes.sort((a, b) => a.startSec - b.startSec);
    const pitches = state.notes.flatMap(n => [n.startPitch, n.endPitch]);
    const minP = Math.min(...pitches);
    const maxP = Math.max(...pitches);
    const pad = Math.max(20, (maxP - minP) * 0.08);
    state.minPitch = minP - pad;
    state.maxPitch = maxP + pad;

    resetScore();
    els.songTitle.textContent = chart.name || chart.shortName || "Loaded chart";
    els.meta.textContent = `${chart.author || "Unknown artist"} · ${state.bpm} BPM · ${state.notes.length} notes · endpoint ${chart.endpoint ?? "?"} beats`;
    setStatus("Ready. Press Start, hold Space/click/gamepad button to sing/toot, and move vertically to match the notes.");
  }

  function resetScore() {
    state.score = 0;
    state.possibleScore = 0;
    state.hitScore = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.judgedSamples = 0;
    state.activeNoteIndex = 0;
    state.noteHits.clear();
    updateScoreUI();
  }

  function updateScoreUI() {
    els.score.textContent = Math.round(state.score).toLocaleString();
    els.combo.textContent = `${state.combo}x`;
    const acc = state.possibleScore > 0 ? (state.hitScore / state.possibleScore) * 100 : 100;
    els.acc.textContent = `${acc.toFixed(1)}%`;
    els.grade.textContent = gradeForAccuracy(acc);
  }

  function gradeForAccuracy(acc) {
    if (acc >= 97) return "S";
    if (acc >= 90) return "A";
    if (acc >= 80) return "B";
    if (acc >= 70) return "C";
    if (acc >= 55) return "D";
    return "F";
  }

  function setStatus(text) {
    els.status.textContent = text;
  }

  function ensureSynth() {
    if (state.synthCtx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sawtooth";
    filter.type = "lowpass";
    filter.frequency.value = 900;
    gain.gain.value = 0.0001;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    state.synthCtx = ctx;
    state.synthOsc = osc;
    state.synthGain = gain;
  }

  function updateSynth() {
    if (!state.synthCtx || !state.synthOsc || !state.synthGain) return;
    const pitchUnits = axisToPitch(state.axis01);
    // TMB pitch units are visually spaced; 13.75 units is one semitone in these charts.
    const semitonesFromA = pitchUnits / 13.75;
    const freq = 220 * Math.pow(2, semitonesFromA / 12);
    const now = state.synthCtx.currentTime;
    state.synthOsc.frequency.setTargetAtTime(clamp(freq, 70, 1200), now, 0.02);
    const targetGain = state.buttonDown && state.running && !audio.paused ? 0.035 : 0.0001;
    state.synthGain.gain.setTargetAtTime(targetGain, now, 0.015);
  }

  function currentGameTime() {
    const offsetSec = Number(els.offsetMs.value || 0) / 1000;
    // Positive offset means notes are judged later relative to audio.
    return Math.max(0, audio.currentTime + offsetSec + state.audioLatencySec);
  }

  function pitchAt(note, tSec) {
    const t = clamp((tSec - note.startSec) / Math.max(0.0001, note.lengthSec), 0, 1);
    return lerp(note.startPitch, note.endPitch, t);
  }

  function activeNoteAt(tSec) {
    // Most charts have no overlapping playable notes. This scan is fine for a prototype.
    while (state.activeNoteIndex < state.notes.length && state.notes[state.activeNoteIndex].endSec < tSec - 0.2) {
      state.activeNoteIndex++;
    }
    for (let i = Math.max(0, state.activeNoteIndex - 2); i < state.notes.length; i++) {
      const n = state.notes[i];
      if (n.startSec > tSec + 0.05) break;
      if (tSec >= n.startSec && tSec <= n.endSec) return n;
    }
    return null;
  }

  function judge(dt) {
    if (!state.running || audio.paused) return;
    const t = currentGameTime();
    const n = activeNoteAt(t);
    if (!n) {
      state.combo = 0;
      return;
    }

    // Score only samples while a playable note is active.
    const perSecond = 1000;
    const possible = perSecond * dt;
    state.possibleScore += possible;
    state.judgedSamples++;

    if (!state.buttonDown) {
      state.combo = 0;
      updateScoreUI();
      return;
    }

    const targetPitch = pitchAt(n, t);
    const playerPitch = axisToPitch(state.axis01);
    const diff = Math.abs(targetPitch - playerPitch);
    const accuracy = clamp(1 - diff / state.pitchTolerance, 0, 1);
    const gained = possible * accuracy;

    state.hitScore += gained;
    state.score += gained;
    if (accuracy > 0.45) {
      state.combo += 1;
      state.maxCombo = Math.max(state.maxCombo, state.combo);
      state.noteHits.set(n.i, true);
    } else {
      state.combo = 0;
    }
    updateScoreUI();
  }

  function drawBackground(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#111927");
    grd.addColorStop(1, "#06080d");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Horizontal pitch guide lines.
    ctx.save();
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    const guideCount = 9;
    for (let i = 0; i <= guideCount; i++) {
      const y = lerp(60, canvas.height - 70, i / guideCount);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Playhead.
    ctx.save();
    ctx.strokeStyle = "#f6f2d8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(state.playheadX, 40);
    ctx.lineTo(state.playheadX, canvas.height - 35);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#d9e3f0";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText(`${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`, 22, 30);
  }

  function drawNotes(t) {
    const startWindow = t - 1.0;
    const endWindow = t + state.lookAheadSeconds;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const n of state.notes) {
      if (n.endSec < startWindow || n.startSec > endWindow) continue;
      const x1 = state.playheadX + (n.startSec - t) * state.pixelsPerSecond;
      const x2 = state.playheadX + (n.endSec - t) * state.pixelsPerSecond;
      const y1 = pitchToY(n.startPitch);
      const y2 = pitchToY(n.endPitch);
      const isActive = t >= n.startSec && t <= n.endSec;
      const hit = state.noteHits.get(n.i);

      ctx.strokeStyle = hit ? "#72f0a8" : isActive ? "#ffd66b" : "#65a9ff";
      ctx.lineWidth = isActive ? 18 : 14;
      ctx.globalAlpha = isActive ? 1 : 0.9;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(x1, y1, isActive ? 9 : 7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawPlayer(t) {
    const playerPitch = axisToPitch(state.axis01);
    const y = pitchToY(playerPitch);
    const active = activeNoteAt(t);
    const targetPitch = active ? pitchAt(active, t) : null;
    const targetY = targetPitch == null ? null : pitchToY(targetPitch);

    // Target helper while active.
    if (targetY != null) {
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(state.playheadX - 55, targetY);
      ctx.lineTo(state.playheadX + 55, targetY);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.fillStyle = state.buttonDown ? "#ff4f7b" : "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(state.playheadX, y, state.buttonDown ? 17 : 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText(state.buttonDown ? "TOOT" : "hold button", state.playheadX - 42, canvas.height - 18);
    ctx.restore();
  }

  function drawDebug(t) {
    if (!els.debug.checked) return;
    const gp = state.gamepadConnected ? "gamepad" : "no gamepad";
    const playerPitch = axisToPitch(state.axis01);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(canvas.width - 340, 12, 320, 98);
    ctx.fillStyle = "#fff";
    ctx.font = "13px monospace";
    ctx.fillText(`game time: ${t.toFixed(3)}s`, canvas.width - 325, 35);
    ctx.fillText(`audio time: ${audio.currentTime.toFixed(3)}s`, canvas.width - 325, 55);
    ctx.fillText(`axis: ${state.axis01.toFixed(3)} pitch: ${playerPitch.toFixed(1)}`, canvas.width - 325, 75);
    ctx.fillText(`button: ${state.buttonDown} ${gp}`, canvas.width - 325, 95);
    ctx.restore();
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - state.lastFrameTime) / 1000);
    state.lastFrameTime = now;

    pollGamepad();
    if (state.running) judge(dt);
    updateSynth();

    const t = currentGameTime();
    drawBackground(t);
    drawNotes(t);
    drawPlayer(t);
    drawDebug(t);

    requestAnimationFrame(frame);
  }

  function setAxisFromClientY(clientY) {
    const r = canvas.getBoundingClientRect();
    state.axis01 = clamp((clientY - r.top) / r.height, 0, 1);
    state.axisFromKeyboard = state.axis01;
  }

  function pollGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = Array.from(pads).find(Boolean);
    state.gamepadConnected = !!pad;
    if (!pad) return;

    // Common gamepad vertical axis is left stick Y on axes[1]. -1 up, +1 down.
    if (pad.axes && pad.axes.length > 1 && Math.abs(pad.axes[1]) > 0.08) {
      state.axis01 = clamp((pad.axes[1] + 1) / 2, 0, 1);
    }
    if (pad.buttons) {
      state.gamepadButtonDown = pad.buttons.some(b => b && b.pressed);
      state.buttonDown = state.mouseButtonDown || state.keyboardButtonDown || state.gamepadButtonDown;
    }
  }

  const keys = { Space: false };

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") { keys.Space = true; state.keyboardButtonDown = true; state.buttonDown = true; e.preventDefault(); }
    if (e.code === "ArrowUp" || e.code === "KeyW") {
      state.axisFromKeyboard = clamp(state.axisFromKeyboard - 0.035, 0, 1);
      state.axis01 = state.axisFromKeyboard;
      e.preventDefault();
    }
    if (e.code === "ArrowDown" || e.code === "KeyS") {
      state.axisFromKeyboard = clamp(state.axisFromKeyboard + 0.035, 0, 1);
      state.axis01 = state.axisFromKeyboard;
      e.preventDefault();
    }
    if (e.code === "Enter") {
      startGame();
      e.preventDefault();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Space") { keys.Space = false; state.keyboardButtonDown = false; state.buttonDown = state.mouseButtonDown || state.gamepadButtonDown; e.preventDefault(); }
  });

  canvas.addEventListener("mousemove", (e) => setAxisFromClientY(e.clientY));
  canvas.addEventListener("pointerdown", (e) => { state.mouseButtonDown = true; state.buttonDown = true; setAxisFromClientY(e.clientY); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", (e) => setAxisFromClientY(e.clientY));
  canvas.addEventListener("pointerup", () => { state.mouseButtonDown = false; state.buttonDown = state.keyboardButtonDown || state.gamepadButtonDown; });
  canvas.addEventListener("pointercancel", () => { state.mouseButtonDown = false; state.buttonDown = state.keyboardButtonDown || state.gamepadButtonDown; });

  els.offsetMs.addEventListener("input", () => {
    els.offsetValue.textContent = `${els.offsetMs.value} ms`;
  });

  els.tmbInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      loadChart(JSON.parse(text));
      setStatus(`Loaded chart: ${file.name}`);
    } catch (err) {
      setStatus(`Could not load chart: ${err.message}`);
    }
  });

  els.oggInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    audio.src = URL.createObjectURL(file);
    audio.load();
    setStatus(`Loaded audio: ${file.name}`);
  });

  els.startBtn.addEventListener("click", startGame);
  els.pauseBtn.addEventListener("click", () => {
    if (audio.paused) audio.play(); else audio.pause();
  });
  els.restartBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    resetScore();
    state.running = false;
    setStatus("Restarted. Press Start when ready.");
  });

  async function startGame() {
    try {
      ensureSynth();
      if (state.synthCtx && state.synthCtx.state === "suspended") await state.synthCtx.resume();
      if (!state.rawChart) loadChart(DEFAULT_CHART);
      if (!audio.src) audio.src = "song.ogg";
      resetScore();
      state.running = true;
      state.lastFrameTime = performance.now();
      await audio.play();
      setStatus("Playing. Match the line and hold the button when a note crosses the playhead.");
    } catch (err) {
      state.running = false;
      setStatus(`Could not start audio. Try clicking the page once, or load song.ogg manually. ${err.message}`);
    }
  }

  // Load default chart immediately. The default audio is the sibling song.ogg file.
  function init() {
    try {
      loadChart(DEFAULT_CHART);
      audio.src = "song.ogg";
      audio.addEventListener("ended", () => {
        state.running = false;
        const acc = state.possibleScore > 0 ? (state.hitScore / state.possibleScore) * 100 : 0;
        setStatus(`Finished. Grade ${gradeForAccuracy(acc)}, max combo ${state.maxCombo}.`);
      });
      requestAnimationFrame(frame);
    } catch (err) {
      setStatus(`Init failed: ${err.message}`);
    }
  }

  init();
})();
