(function () {
  const mapEl = document.getElementById("footprint-map");
  if (!mapEl || !window.L) return;

  const cfg = window.FOOTPRINTS_CONFIG || {};
  const owner = cfg.owner || "b1owcar";
  const repo = cfg.repo || "b1owcar.github.io";
  const label = cfg.label || "footprint";
  const issuesApi = `https://api.github.com/repos/${owner}/${repo}/issues?labels=${encodeURIComponent(
    label
  )}&state=open&per_page=100`;
  const statusEl = document.getElementById("foot-status");
  if (!statusEl) return;

  let map;
  let markersLayer = L.layerGroup();
  let currentTileLayer;
  let currentLang = localStorage.getItem("site-lang") || "zh-CN";

  const dict = {
    "zh-CN": {
      loading: "正在加载足迹...",
      loaded: "",
      loadFail: "加载足迹失败，请稍后重试。",
      popupDate: "时间",
      popupDesc: "描述"
    },
    "zh-TW": {
      loading: "正在載入足跡...",
      loaded: "",
      loadFail: "載入足跡失敗，請稍後再試。",
      popupDate: "時間",
      popupDesc: "描述"
    },
    en: {
      loading: "Loading footprints...",
      loaded: "",
      loadFail: "Failed to load footprints. Please try again later.",
      popupDate: "Date",
      popupDesc: "Description"
    }
  };

  function tx(key) {
    return (dict[currentLang] && dict[currentLang][key]) || dict["zh-CN"][key] || key;
  }

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.style.color = isError ? "#ff9baa" : "#d4e9ff";
  }

  function mapTilesByTheme(theme) {
    if (theme === "light") {
      return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
    return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  }

  function updateMapTile(theme) {
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }
    currentTileLayer = L.tileLayer(mapTilesByTheme(theme), {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20
    });
    currentTileLayer.addTo(map);
  }

  function initMap() {
    map = L.map("footprint-map", { zoomControl: true }).setView([22.1987, 113.5439], 4);
    updateMapTile(document.body.getAttribute("data-theme") || "dark");
    markersLayer.addTo(map);
  }

  function parseIssue(issue) {
    try {
      const bodyJson = JSON.parse(issue.body || "{}");
      if (!bodyJson.lat || !bodyJson.lng) return null;
      return {
        title: issue.title,
        lat: Number(bodyJson.lat),
        lng: Number(bodyJson.lng),
        date: bodyJson.date || issue.created_at?.slice(0, 10),
        description: bodyJson.description || "",
        image: bodyJson.image || "",
        url: issue.html_url
      };
    } catch (_error) {
      return null;
    }
  }

  function createPopupHtml(point) {
    const imageNode = point.image
      ? `<img src="${point.image}" alt="${point.title}" />`
      : "";
    return `
      <div class="footprint-popup">
        <h4>${point.title}</h4>
        ${imageNode}
        <p class="date">${tx("popupDate")}: ${point.date || "-"}</p>
        <p>${tx("popupDesc")}: ${point.description || "-"}</p>
        <a href="${point.url}" target="_blank" rel="noreferrer">GitHub Issue</a>
      </div>
    `;
  }

  function neonIcon() {
    return L.divIcon({
      className: "footprint-icon-wrap",
      html: '<div class="footprint-dot"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  }

  async function fetchFootprints() {
    setStatus(tx("loading"));
    markersLayer.clearLayers();

    try {
      const response = await fetch(issuesApi, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      const issues = await response.json();
      const points = issues.map(parseIssue).filter(Boolean);
      points.forEach((point) => {
        const marker = L.marker([point.lat, point.lng], { icon: neonIcon() }).addTo(markersLayer);
        marker.bindPopup(createPopupHtml(point), { maxWidth: 300 });
      });
      setStatus(tx("loaded"));
    } catch (_error) {
      setStatus(tx("loadFail"), true);
    }
  }

  window.addEventListener("languagechange", (event) => {
    currentLang = event.detail.lang || "zh-CN";
    fetchFootprints();
  });

  window.addEventListener("themechange", (event) => {
    const theme = event.detail.theme || "dark";
    updateMapTile(theme);
  });

  initMap();
  fetchFootprints();
})();
