(function () {
  const mapEl = document.getElementById("footprint-map");
  if (!mapEl || !window.L) return;

  const dataUrl = "./assets/data/footprints-heatmap.json";
  const statusEl = document.getElementById("foot-status");
  if (!statusEl) return;

  let map;
  let markersLayer = L.layerGroup();
  let heatLayer = null;
  let currentTileLayer;
  let currentLang = localStorage.getItem("site-lang") || "zh-CN";

  const dict = {
    "zh-CN": {
      loading: "正在加载足迹...",
      loaded: "",
      loadFail: "加载热力图失败，请稍后重试。",
      noData: "暂无足迹数据。",
      popupDate: "时间",
      popupDesc: "描述",
      popupDuration: "停留时长",
      popupType: "类型"
    },
    "zh-TW": {
      loading: "正在載入足跡...",
      loaded: "",
      loadFail: "載入熱力圖失敗，請稍後再試。",
      noData: "暫無足跡資料。",
      popupDate: "時間",
      popupDesc: "描述",
      popupDuration: "停留時長",
      popupType: "類型"
    },
    en: {
      loading: "Loading footprints...",
      loaded: "",
      loadFail: "Failed to load heatmap data. Please try again later.",
      noData: "No footprint data available.",
      popupDate: "Date",
      popupDesc: "Description",
      popupDuration: "Duration",
      popupType: "Type"
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
      return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
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

  function formatDuration(days) {
    if (days >= 365) {
      const years = days / 365;
      return `${years.toFixed(1)}y`;
    }
    if (days >= 30) {
      return `${(days / 30).toFixed(1)}mo`;
    }
    if (days >= 1) {
      return `${days.toFixed(days < 10 ? 1 : 0)}d`;
    }
    return `${Math.round(days * 24)}h`;
  }

  function normalizeWeights(points) {
    const max = Math.max(...points.map((point) => point.duration_days), 1);
    return points.map((point) => {
      // Log scaling keeps short stays visible while preserving long-stay dominance.
      const weight = Math.log1p(point.duration_days) / Math.log1p(max);
      return {
        ...point,
        heatWeight: Math.max(0.08, Math.min(1, Number(weight.toFixed(4))))
      };
    });
  }

  function createPopupHtml(point) {
    return `
      <div class="footprint-popup">
        <h4>${point.label}</h4>
        <p class="date">${tx("popupType")}: ${point.category}</p>
        <p>${tx("popupDuration")}: ${formatDuration(point.duration_days)}</p>
        <p>${tx("popupDesc")}: ${point.note || "-"}</p>
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
    if (heatLayer) {
      map.removeLayer(heatLayer);
      heatLayer = null;
    }

    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      const payload = await response.json();
      const rawPoints = Array.isArray(payload.points) ? payload.points : [];
      if (!rawPoints.length) {
        setStatus(tx("noData"), true);
        return;
      }
      const points = normalizeWeights(rawPoints);

      heatLayer = L.heatLayer(
        points.map((point) => [point.lat, point.lng, point.heatWeight]),
        {
          radius: 30,
          blur: 24,
          maxZoom: 8,
          minOpacity: 0.35,
          gradient: {
            0.2: "#5de2ff",
            0.45: "#4fc3ff",
            0.7: "#9f6bff",
            1.0: "#ff6fcf"
          }
        }
      );
      heatLayer.addTo(map);

      points.forEach((point) => {
        const marker = L.marker([point.lat, point.lng], { icon: neonIcon() }).addTo(markersLayer);
        marker.bindPopup(createPopupHtml(point), { maxWidth: 300 });
      });
      const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]));
      map.fitBounds(bounds.pad(0.12));
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
