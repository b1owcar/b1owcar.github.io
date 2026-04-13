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
  const createIssueApi = `https://api.github.com/repos/${owner}/${repo}/issues`;

  const form = document.getElementById("footprint-form");
  const statusEl = document.getElementById("foot-status");
  const latEl = document.getElementById("foot-lat");
  const lngEl = document.getElementById("foot-lng");
  const tokenEl = document.getElementById("gh-token");
  const uploadDropzone = document.getElementById("upload-dropzone");
  const uploadInput = document.getElementById("foot-image");
  const uploadName = document.getElementById("upload-name");
  const submitBtn = document.getElementById("foot-submit");

  let uploadedImageData = "";
  let map;
  let selectedMarker;
  let markersLayer = L.layerGroup();
  let currentLang = localStorage.getItem("site-lang") || "zh-CN";

  const dict = {
    "zh-CN": {
      loading: "正在加载足迹...",
      loaded: "足迹加载完成。",
      loadFail: "加载足迹失败，请稍后重试。",
      noPoint: "请先点击地图选择经纬度。",
      noToken: "请填写 GitHub Token。",
      noImage: "请上传图片。",
      creating: "正在创建 Issue...",
      created: "创建成功，正在刷新地图。",
      createFail: "创建失败，请检查 Token 权限与仓库配置。",
      pickPoint: "地图点击位置",
      uploaded: "已上传图片：",
      popupDate: "时间",
      popupDesc: "描述"
    },
    "zh-TW": {
      loading: "正在載入足跡...",
      loaded: "足跡載入完成。",
      loadFail: "載入足跡失敗，請稍後再試。",
      noPoint: "請先點擊地圖選擇經緯度。",
      noToken: "請填寫 GitHub 權杖。",
      noImage: "請上傳圖片。",
      creating: "正在建立 Issue...",
      created: "建立成功，正在重新整理地圖。",
      createFail: "建立失敗，請檢查權杖權限與倉庫設定。",
      pickPoint: "地圖點選位置",
      uploaded: "已上傳圖片：",
      popupDate: "時間",
      popupDesc: "描述"
    },
    en: {
      loading: "Loading footprints...",
      loaded: "Footprints loaded.",
      loadFail: "Failed to load footprints. Please try again later.",
      noPoint: "Please click on the map to select coordinates first.",
      noToken: "Please enter your GitHub token.",
      noImage: "Please upload an image.",
      creating: "Creating issue...",
      created: "Issue created. Refreshing map...",
      createFail: "Failed to create issue. Please check token permissions and repository settings.",
      pickPoint: "Selected point",
      uploaded: "Uploaded image:",
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

  function initMap() {
    map = L.map("footprint-map", { zoomControl: true }).setView([22.1987, 113.5439], 4);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20
    }).addTo(map);

    markersLayer.addTo(map);

    map.on("click", (ev) => {
      const lat = ev.latlng.lat.toFixed(6);
      const lng = ev.latlng.lng.toFixed(6);
      latEl.value = lat;
      lngEl.value = lng;

      if (selectedMarker) map.removeLayer(selectedMarker);
      selectedMarker = L.circleMarker([lat, lng], {
        radius: 8,
        color: "#37f2ff",
        fillColor: "#37f2ff",
        fillOpacity: 0.5,
        weight: 2
      }).addTo(map);
      selectedMarker.bindTooltip(tx("pickPoint")).openTooltip();
    });
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

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("read file failed"));
      reader.readAsDataURL(file);
    });
  }

  async function handleFile(file) {
    if (!file) return;
    uploadedImageData = await fileToDataUrl(file);
    uploadName.textContent = `${tx("uploaded")} ${file.name}`;
  }

  uploadDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadDropzone.classList.add("dragging");
  });
  uploadDropzone.addEventListener("dragleave", () => {
    uploadDropzone.classList.remove("dragging");
  });
  uploadDropzone.addEventListener("drop", async (event) => {
    event.preventDefault();
    uploadDropzone.classList.remove("dragging");
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    await handleFile(file);
  });
  uploadInput.addEventListener("change", async () => {
    const file = uploadInput.files && uploadInput.files[0];
    await handleFile(file);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const description = String(fd.get("description") || "").trim();
    const lat = Number(fd.get("lat"));
    const lng = Number(fd.get("lng"));
    const ghToken = String(fd.get("ghToken") || "").trim();

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setStatus(tx("noPoint"), true);
      return;
    }
    if (!ghToken) {
      setStatus(tx("noToken"), true);
      return;
    }
    if (!uploadedImageData) {
      setStatus(tx("noImage"), true);
      return;
    }

    submitBtn.disabled = true;
    setStatus(tx("creating"));

    const payload = {
      title: name,
      labels: [label],
      body: JSON.stringify(
        {
          lat,
          lng,
          date: new Date().toISOString().slice(0, 10),
          description,
          image: uploadedImageData
        },
        null,
        2
      )
    };

    try {
      const response = await fetch(createIssueApi, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${ghToken}`,
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      form.reset();
      uploadedImageData = "";
      uploadName.textContent = "";
      setStatus(tx("created"));
      await fetchFootprints();
    } catch (_error) {
      setStatus(tx("createFail"), true);
    } finally {
      submitBtn.disabled = false;
    }
  });

  window.addEventListener("languagechange", (event) => {
    currentLang = event.detail.lang || "zh-CN";
    if (selectedMarker) {
      selectedMarker.bindTooltip(tx("pickPoint"));
    }
  });

  initMap();
  fetchFootprints();
})();
