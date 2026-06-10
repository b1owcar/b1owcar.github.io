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

  let canvasWidth = 0;
  let canvasHeight = 0;

  function getPageHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = getPageHeight();
    canvas.width = Math.floor(canvasWidth * ratio);
    canvas.height = Math.floor(canvasHeight * ratio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    const backdrop = canvas.parentElement;
    if (backdrop) {
      backdrop.style.height = `${canvasHeight}px`;
    }
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

  function buildWaveConfigs(height) {
    const spread = Math.max(height * 0.18, 280);
    return [
      { baseY: spread * 0.9, freq: 0.0055, amp: 42, drift: 0.9, colorKey: "cyan", alpha: 0.22, width: 1.6 },
      { baseY: spread * 2.1, freq: 0.0082, amp: 58, drift: 1.35, colorKey: "purple", alpha: 0.18, width: 1.4 },
      { baseY: spread * 3.4, freq: 0.0048, amp: 36, drift: 0.7, colorKey: "cyan", alpha: 0.14, width: 1.2 },
      { baseY: height - spread * 1.2, freq: 0.0066, amp: 48, drift: 1.1, colorKey: "purple", alpha: 0.16, width: 1.5 },
      { baseY: height * 0.52, freq: 0.0036, amp: 64, drift: 0.55, colorKey: "cyan", alpha: 0.12, width: 1.8 }
    ].filter((cfg) => cfg.baseY > 80 && cfg.baseY < height - 60);
  }

  function drawOrganicWave(width, config, levels, colors, phase, scrollY) {
    const steps = Math.max(48, Math.floor(width / 8));
    const color = colors[config.colorKey];
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const x = (i / steps) * width;
      const levelIndex = Math.floor((i / steps) * (levels.length - 1));
      const level = levels[levelIndex];
      const y =
        config.baseY +
        Math.sin(x * config.freq + phase * config.drift + scrollY * 0.0015) * config.amp +
        Math.cos(x * config.freq * 0.45 + phase * 0.6) * (config.amp * 0.28) +
        (level - 0.45) * config.amp * 0.35;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = config.alpha;
    ctx.lineWidth = config.width;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawAmbientGlows(width, height, colors, phase) {
    const anchors = [
      { x: 0.18, y: 0.16, r: 0.42 },
      { x: 0.78, y: 0.34, r: 0.36 },
      { x: 0.42, y: 0.62, r: 0.48 },
      { x: 0.72, y: 0.84, r: 0.38 }
    ];
    anchors.forEach((anchor, index) => {
      const centerX = width * anchor.x + Math.sin(phase * 0.4 + index) * 18;
      const centerY = height * anchor.y + Math.cos(phase * 0.35 + index) * 22;
      const radius = Math.min(width, height) * anchor.r;
      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      const tint = index % 2 === 0 ? colors.cyan : colors.purple;
      glow.addColorStop(0, `${tint}18`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    });
  }

  function drawSpectrumRibbon(width, height, levels, colors, phase) {
    const ribbonY = height * 0.78 + Math.sin(phase * 0.5) * 12;
    const barCount = 40;
    const barWidth = width / barCount;
    const maxHeight = Math.min(height * 0.08, 72);
    for (let i = 0; i < barCount; i += 1) {
      const levelIndex = Math.floor((i / barCount) * levels.length);
      const level = levels[levelIndex];
      const barHeight = level * maxHeight * (0.65 + 0.35 * Math.sin(i * 0.4 + phase));
      const x = i * barWidth;
      const gradient = ctx.createLinearGradient(0, ribbonY, 0, ribbonY - barHeight);
      gradient.addColorStop(0, colors.cyan);
      gradient.addColorStop(1, colors.purple);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.06 + level * 0.12;
      ctx.fillRect(x + barWidth * 0.22, ribbonY - barHeight, barWidth * 0.56, barHeight);
    }
    ctx.globalAlpha = 1;
  }

  function renderFrame() {
    const width = canvasWidth || window.innerWidth;
    const height = canvasHeight || getPageHeight();
    const colors = readThemeColors();
    const levels = getWaveLevels(64);
    const phase = Date.now() * 0.0014;
    const scrollY = window.scrollY || 0;

    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, colors.bgStart);
    bg.addColorStop(0.45, colors.bgEnd);
    bg.addColorStop(1, colors.bgStart);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    drawAmbientGlows(width, height, colors, phase);
    buildWaveConfigs(height).forEach((config) => {
      drawOrganicWave(width, config, levels, colors, phase, scrollY);
    });
    drawSpectrumRibbon(width, height, levels, colors, phase);

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
  window.addEventListener("load", resizeCanvas);

  if (typeof ResizeObserver !== "undefined") {
    const pageObserver = new ResizeObserver(() => resizeCanvas());
    pageObserver.observe(document.body);
    pageObserver.observe(document.documentElement);
  }

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
