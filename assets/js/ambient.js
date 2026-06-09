(function () {
  const audioEl = document.getElementById("ambient-audio");
  const canvas = document.getElementById("ambient-wave-canvas");
  const playBtn = document.getElementById("ambient-play");
  const muteBtn = document.getElementById("ambient-mute");
  if (!audioEl || !canvas || !playBtn || !muteBtn) return;

  const ctx = canvas.getContext("2d");
  let audioContext;
  let analyser;
  let sourceNode;
  let frequencyData;
  let animationId;
  let isPlaying = localStorage.getItem("ambient-paused") !== "1";
  let isMuted = localStorage.getItem("ambient-muted") === "1";
  let currentLang = localStorage.getItem("site-lang") || "zh-CN";

  const dict = {
    "zh-CN": {
      play: "播放音乐",
      pause: "暂停播放",
      mute: "静音",
      unmute: "取消静音"
    },
    "zh-TW": {
      play: "播放音樂",
      pause: "暫停播放",
      mute: "靜音",
      unmute: "取消靜音"
    },
    en: {
      play: "Play music",
      pause: "Pause music",
      mute: "Mute",
      unmute: "Unmute"
    }
  };

  function tx(key) {
    return (dict[currentLang] && dict[currentLang][key]) || dict["zh-CN"][key] || key;
  }

  function readThemeColors() {
    const style = getComputedStyle(document.body);
    return {
      cyan: style.getPropertyValue("--accent-cyan").trim() || "#37f2ff",
      purple: style.getPropertyValue("--accent-purple").trim() || "#bb66ff",
      bgStart: style.getPropertyValue("--bg-start").trim() || "#050a18",
      bgEnd: style.getPropertyValue("--bg-end").trim() || "#0f1830"
    };
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function initAudioGraph() {
    if (audioContext) return;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audioEl);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.82;
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  async function resumeAudioContext() {
    initAudioGraph();
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
  }

  function getWaveLevels(barCount) {
    const levels = new Array(barCount).fill(0);
    if (isPlaying && !audioEl.paused && analyser && frequencyData) {
      analyser.getByteFrequencyData(frequencyData);
      for (let i = 0; i < barCount; i += 1) {
        const index = Math.floor((i / barCount) * frequencyData.length);
        levels[i] = frequencyData[index] / 255;
      }
      return levels;
    }
    const t = Date.now() * 0.001;
    for (let i = 0; i < barCount; i += 1) {
      levels[i] = 0.12 + 0.07 * Math.sin(t * 1.15 + i * 0.31) + 0.04 * Math.cos(t * 0.7 + i * 0.18);
    }
    return levels;
  }

  function drawWaveLine(width, height, yRatio, levels, color, amplitude, phase) {
    const yBase = height * yRatio;
    const step = width / (levels.length - 1);
    ctx.beginPath();
    levels.forEach((level, index) => {
      const x = index * step;
      const wave = Math.sin(index * 0.22 + phase) * 0.15;
      const y = yBase + (level + wave - 0.45) * amplitude;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawBars(width, height, levels, colors) {
    const barWidth = width / levels.length;
    const maxBarHeight = height * 0.22;
    levels.forEach((level, index) => {
      const barHeight = level * maxBarHeight;
      const x = index * barWidth;
      const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
      gradient.addColorStop(0, colors.cyan);
      gradient.addColorStop(1, colors.purple);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.14 + level * 0.2;
      ctx.fillRect(x + barWidth * 0.15, height - barHeight, barWidth * 0.7, barHeight);
    });
    ctx.globalAlpha = 1;
  }

  function renderFrame() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const colors = readThemeColors();
    const levels = getWaveLevels(72);
    const phase = Date.now() * 0.0018;

    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, colors.bgStart);
    bg.addColorStop(1, colors.bgEnd);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    drawBars(width, height, levels, colors);

    ctx.globalAlpha = 0.42;
    drawWaveLine(width, height, 0.34, levels, colors.cyan, height * 0.09, phase);
    drawWaveLine(width, height, 0.52, levels, colors.purple, height * 0.11, phase + 1.4);
    drawWaveLine(width, height, 0.7, levels, colors.cyan, height * 0.08, phase + 2.6);
    ctx.globalAlpha = 1;

    animationId = window.requestAnimationFrame(renderFrame);
  }

  function updateControlLabels() {
    playBtn.textContent = isPlaying ? "⏸" : "▶";
    playBtn.setAttribute("aria-label", isPlaying ? tx("pause") : tx("play"));
    playBtn.title = isPlaying ? tx("pause") : tx("play");
    muteBtn.textContent = isMuted ? "🔇" : "🔊";
    muteBtn.setAttribute("aria-label", isMuted ? tx("unmute") : tx("mute"));
    muteBtn.title = isMuted ? tx("unmute") : tx("mute");
    document.body.classList.toggle("ambient-paused", !isPlaying);
    document.body.classList.toggle("ambient-muted", isMuted);
  }

  function persistState() {
    localStorage.setItem("ambient-paused", isPlaying ? "0" : "1");
    localStorage.setItem("ambient-muted", isMuted ? "1" : "0");
  }

  async function startPlayback() {
    if (!isPlaying) return;
    await resumeAudioContext();
    audioEl.muted = isMuted;
    try {
      await audioEl.play();
    } catch (_error) {
      document.addEventListener(
        "pointerdown",
        () => {
          if (isPlaying) startPlayback();
        },
        { once: true }
      );
    }
  }

  function pausePlayback() {
    audioEl.pause();
  }

  playBtn.addEventListener("click", async () => {
    isPlaying = !isPlaying;
    persistState();
    updateControlLabels();
    if (isPlaying) {
      await startPlayback();
    } else {
      pausePlayback();
    }
  });

  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    audioEl.muted = isMuted;
    persistState();
    updateControlLabels();
  });

  window.addEventListener("languagechange", (event) => {
    currentLang = event.detail.lang || "zh-CN";
    updateControlLabels();
  });

  window.addEventListener("themechange", () => {
    // Colors are read every animation frame from CSS variables.
  });

  window.addEventListener("resize", resizeCanvas);

  audioEl.loop = true;
  audioEl.muted = isMuted;
  resizeCanvas();
  updateControlLabels();
  renderFrame();

  if (isPlaying) {
    startPlayback();
  } else {
    audioEl.pause();
  }
})();
