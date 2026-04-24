(function () {
  const mapEl = document.getElementById("footprint-map");
  if (!mapEl || !window.L) return;

  const dataUrl = "./assets/data/footprints-heatmap.json";
  const dataRequestUrl = `${dataUrl}?v=${Date.now()}`;
  const statusEl = document.getElementById("foot-status");
  if (!statusEl) return;

  let map;
  let boundaryLayer = L.layerGroup();
  let transitMarkerLayer = L.layerGroup();
  let currentTileLayer;
  let legendControl;
  let currentLang = localStorage.getItem("site-lang") || "zh-CN";

  const dict = {
    "zh-CN": {
      loading: "正在加载足迹...",
      loaded: "",
      loadFail: "加载热力图失败，请稍后重试。",
      noData: "暂无足迹数据。",
      popupDesc: "描述",
      popupDuration: "停留时长",
      popupType: "分类",
      popupArea: "行政单位",
      legendTitle: "足迹图例",
      categoryLongstay: "长住区域",
      categoryCurrentResidence: "目前常住地",
      categoryTravel: "旅游打卡",
      categoryTransit: "特别短暂停留",
      tierText: "热度分层（同类内）"
    },
    "zh-TW": {
      loading: "正在載入足跡...",
      loaded: "",
      loadFail: "載入熱力圖失敗，請稍後再試。",
      noData: "暫無足跡資料。",
      popupDesc: "描述",
      popupDuration: "停留時長",
      popupType: "分類",
      popupArea: "行政單位",
      legendTitle: "足跡圖例",
      categoryLongstay: "長住區域",
      categoryCurrentResidence: "目前常住地",
      categoryTravel: "旅遊打卡",
      categoryTransit: "特別短暫停留",
      tierText: "熱度分層（同類內）"
    },
    en: {
      loading: "Loading footprints...",
      loaded: "",
      loadFail: "Failed to load heatmap data. Please try again later.",
      noData: "No footprint data available.",
      popupDesc: "Description",
      popupDuration: "Duration",
      popupType: "Category",
      popupArea: "Administrative Unit",
      legendTitle: "Footprints Legend",
      categoryLongstay: "Long-stay",
      categoryCurrentResidence: "Current Residence",
      categoryTravel: "Travel",
      categoryTransit: "Transit",
      tierText: "Heat tiers (within category)"
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
    boundaryLayer.addTo(map);
    transitMarkerLayer.addTo(map);
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

  function categoryLabel(category) {
    if (category === "current_residence") return tx("categoryCurrentResidence");
    if (category === "longstay") return tx("categoryLongstay");
    if (category === "travel") return tx("categoryTravel");
    return tx("categoryTransit");
  }

  function createPopupHtml(region) {
    return `
      <div class="footprint-popup">
        <h4>${region.name}</h4>
        <p class="date">${tx("popupType")}: ${categoryLabel(region.current_residence ? "current_residence" : region.category)}</p>
        <p>${tx("popupArea")}: ${region.area_level || "-"}</p>
        <p>${tx("popupDuration")}: ${formatDuration(region.duration_days)}</p>
        <p>${tx("popupDesc")}: ${region.note || "-"}</p>
      </div>
    `;
  }

  function computeTiersByCategory(regions) {
    const grouped = regions.reduce((acc, item) => {
      const key = item.category || "travel";
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
    const tiers = new Map();
    Object.keys(grouped).forEach((category) => {
      const sorted = grouped[category]
        .map((item) => item.duration_days)
        .sort((a, b) => b - a);
      const maxIndex = Math.max(sorted.length - 1, 1);
      grouped[category].forEach((item) => {
        const index = sorted.indexOf(item.duration_days);
        const normalized = 1 - index / maxIndex;
        const tier = Math.max(1, Math.min(5, Math.ceil(normalized * 5)));
        tiers.set(item.id, tier);
      });
    });
    return tiers;
  }

  function styleByCategoryAndTier(category, tier, isCurrentResidence) {
    const tierIndex = Math.max(0, Math.min(4, 5 - tier));
    if (isCurrentResidence) {
      const currentPalette = ["#ffd8a8", "#ffbe76", "#ffa94d", "#ff922b", "#ff7f11"];
      return {
        color: "#fff1cc",
        fillColor: currentPalette[tierIndex],
        weight: 2.6,
        fillOpacity: 0.78,
        radius: 0
      };
    }
    const byCategory = {
      longstay: {
        fill: ["#b7fbff", "#7df4ff", "#43e8ff", "#22d3ee", "#0ea5c6"],
        stroke: "#7df4ff"
      },
      travel: {
        fill: ["#efccff", "#d79bff", "#bf6eff", "#9a42f5", "#7c2bd1"],
        stroke: "#d9a8ff"
      },
      transit: {
        fill: ["#ffe9a3", "#ffd978", "#ffcb52", "#ffb703", "#fb8500"],
        stroke: "#ffe29a"
      }
    };
    const palette = byCategory[category] || byCategory.travel;
    const fillOpacity = 0.22 + tier * 0.11;
    return {
      color: palette.stroke,
      fillColor: palette.fill[tierIndex],
      weight: category === "travel" ? 1.8 : 2,
      dashArray: category === "travel" ? "5 3" : null,
      fillOpacity: Math.min(0.8, fillOpacity),
      radius: 0
    };
  }

  function boundarySizeByAreaLevel(areaLevel) {
    const table = {
      sar: { lat: 0.12, lng: 0.16 },
      city: { lat: 0.22, lng: 0.28 },
      district: { lat: 0.1, lng: 0.12 },
      county: { lat: 0.16, lng: 0.2 },
      town: { lat: 0.08, lng: 0.1 },
      airport: { lat: 0.05, lng: 0.06 },
      station: { lat: 0.04, lng: 0.05 }
    };
    return table[areaLevel] || { lat: 0.14, lng: 0.18 };
  }

  function buildFallbackBoundary(region) {
    const size = boundarySizeByAreaLevel(region.area_level);
    const lat = Number(region.lat);
    const lng = Number(region.lng);
    // Use an ellipse-like polygon as fallback to avoid rough square blocks.
    const points = [];
    const steps = 14;
    for (let i = 0; i <= steps; i += 1) {
      const theta = (Math.PI * 2 * i) / steps;
      const jitter = 1 + 0.08 * Math.sin(i * 1.7);
      points.push([
        lat + Math.sin(theta) * size.lat * jitter,
        lng + Math.cos(theta) * size.lng * jitter
      ]);
    }
    return points;
  }

  function toGeoJsonFeature(region) {
    const boundary = Array.isArray(region.boundary) && region.boundary.length >= 4 ? region.boundary : buildFallbackBoundary(region);
    return {
      type: "Feature",
      properties: {
        id: region.id,
        name: region.name,
        category: region.category,
        area_level: region.area_level,
        duration_days: region.duration_days,
        note: region.note || ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [boundary.map((coord) => [coord[1], coord[0]])]
      }
    };
  }

  function neonIcon(category) {
    const cls = category === "transit" ? "footprint-dot transit" : "footprint-dot";
    const size = category === "transit" ? 9 : 14;
    return L.divIcon({
      className: "footprint-icon-wrap",
      html: `<div class="${cls}"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }

  function renderLegend() {
    if (legendControl) map.removeControl(legendControl);
    legendControl = L.control({ position: "bottomright" });
    legendControl.onAdd = function onAdd() {
      const div = L.DomUtil.create("div", "footprint-legend glass-panel");
      div.innerHTML = `
        <h4>${tx("legendTitle")}</h4>
        <p><span class="legend-dot legend-current"></span>${tx("categoryCurrentResidence")}</p>
        <p><span class="legend-dot legend-longstay"></span>${tx("categoryLongstay")}</p>
        <p><span class="legend-dot legend-travel"></span>${tx("categoryTravel")}</p>
        <p><span class="legend-dot legend-transit"></span>${tx("categoryTransit")}</p>
        <small>${tx("tierText")}: 5 → 1</small>
      `;
      return div;
    };
    legendControl.addTo(map);
  }

  async function fetchFootprints() {
    setStatus(tx("loading"));
    boundaryLayer.clearLayers();
    transitMarkerLayer.clearLayers();

    try {
      const response = await fetch(dataRequestUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      const payload = await response.json();
      const regions = Array.isArray(payload.regions) ? payload.regions : [];
      if (!regions.length) {
        setStatus(tx("noData"), true);
        return;
      }

      const tierMap = computeTiersByCategory(regions);
      const polygonFeatures = [];
      regions.forEach((region) => {
        const tier = tierMap.get(region.id) || 1;
        if (region.category === "transit") {
          const marker = L.marker([region.lat, region.lng], { icon: neonIcon("transit") }).addTo(transitMarkerLayer);
          marker.bindPopup(createPopupHtml(region), { maxWidth: 320 });
          return;
        }
        const feature = toGeoJsonFeature(region);
        feature.properties.tier = tier;
        feature.properties.current_residence = Boolean(region.current_residence);
        polygonFeatures.push(feature);
      });

      const polygonGeoJson = L.geoJSON(
        { type: "FeatureCollection", features: polygonFeatures },
        {
          style: (feature) => {
            const style = styleByCategoryAndTier(
              feature.properties.category,
              feature.properties.tier || 1,
              Boolean(feature.properties.current_residence)
            );
            return {
              color: style.color,
              fillColor: style.fillColor,
              weight: style.weight,
              fillOpacity: style.fillOpacity
            };
          },
          onEachFeature: (feature, layer) => {
            const region = feature.properties;
            layer.bindPopup(
              createPopupHtml({
                name: region.name,
                category: region.category,
                current_residence: region.current_residence,
                area_level: region.area_level,
                duration_days: region.duration_days,
                note: region.note
              }),
              { maxWidth: 320 }
            );
          }
        }
      ).addTo(boundaryLayer);

      renderLegend();
      const bounds = polygonGeoJson.getBounds();
      if (regions.some((region) => region.category === "transit")) {
        regions
          .filter((region) => region.category === "transit")
          .forEach((region) => bounds.extend([region.lat, region.lng]));
      }
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
