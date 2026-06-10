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

  function drawBarsInSegment(width, top, segmentHeight, levels, colors) {
    const barWidth = width / levels.length;
    const maxBarHeight = segmentHeight * 0.24;
    const baseY = top + segmentHeight;
    levels.forEach((level, index) => {
      const barHeight = level * maxBarHeight;
      const x = index * barWidth;
      const gradient = ctx.createLinearGradient(0, baseY, 0, baseY - barHeight);
      gradient.addColorStop(0, colors.cyan);
      gradient.addColorStop(1, colors.purple);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.1 + level * 0.18;
      ctx.fillRect(x + barWidth * 0.15, baseY - barHeight, barWidth * 0.7, barHeight);
    });
    ctx.globalAlpha = 1;
  }

  function drawAmbientGlows(width, height, colors, phase) {
    const segment = Math.max(window.innerHeight * 0.85, 520);
    const glowCount = Math.ceil(height / segment);
    for (let i = 0; i < glowCount; i += 1) {
      const centerY = i * segment + segment * 0.45 + Math.sin(phase + i) * 24;
      const centerX = width * (0.22 + (i % 3) * 0.28);
      const radius = Math.min(width, segment) * 0.34;
      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      glow.addColorStop(0, i % 2 === 0 ? `${colors.cyan}22` : `${colors.purple}20`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    }
  }

  function drawWaveBands(width, height, levels, colors, phase) {
    const segment = Math.max(window.innerHeight * 0.9, 540);
    const bandCount = Math.max(2, Math.ceil(height / segment));
    ctx.globalAlpha = 0.36;
    for (let band = 0; band < bandCount; band += 1) {
      const top = band * segment;
      const segmentHeight = Math.min(segment, height - top);
      const yRatios = [0.38, 0.58, 0.76];
      yRatios.forEach((ratio, index) => {
        const absoluteRatio = (top + segmentHeight * ratio) / height;
        const color = index % 2 === 0 ? colors.cyan : colors.purple;
        const amplitude = Math.min(segmentHeight * 0.11, 72);
        drawWaveLine(width, height, absoluteRatio, levels, color, amplitude, phase + band * 1.1 + index * 0.6);
      });
      drawBarsInSegment(width, top, segmentHeight, levels, colors);
    }
    ctx.globalAlpha = 1;
  }

  function renderFrame() {
    const width = canvasWidth || window.innerWidth;
    const height = canvasHeight || getPageHeight();
    const colors = readThemeColors();
    const levels = getWaveLevels(72);
    const phase = Date.now() * 0.0018;

    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, colors.bgStart);
    bg.addColorStop(0.55, colors.bgEnd);
    bg.addColorStop(1, colors.bgStart);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    drawAmbientGlows(width, height, colors, phase);
    drawWaveBands(width, height, levels, colors, phase);

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
