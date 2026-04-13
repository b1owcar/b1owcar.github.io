(function () {
  const i18n = {
    "zh-CN": {
      "nav.about": "关于我",
      "nav.studio": "工作室",
      "nav.footprints": "我的足迹",
      "nav.contact": "联系我",
      "nav.board": "留言板",
      "lang.label": "语言",
      "about.title": "关于我",
      "about.p1": "我目前是一位在澳门工作的技术员。这里是占位简介，后续我会补充完整的个人介绍。",
      "about.p2": "我关注技术、设计和骑行工程，也喜欢将实用想法与视觉表达结合起来。",
      "studio.title": "b1owcar Studio",
      "studio.since": "成立于 2021",
      "studio.desc": "该工作室创建于 2021 年，属于非盈利性质，意在发展自己的个人兴趣并沉淀作品。",
      "studio.card1.title": "Studio 的定位",
      "studio.card1.desc": "一个个人创意实验室，聚焦实用数字体验、视觉语言和轻量技术探索。",
      "studio.card2.title": "个人项目展示",
      "studio.card2.desc": "用于展示网站概念、小型效率工具与设计驱动型作品的占位内容。",
      "studio.card3.title": "未来方向",
      "studio.card3.desc": "未来将继续围绕 UI 系统、实用工具和骑行工程进行持续探索。",
      "foot.title": "我的足迹",
      "foot.subtitle": "我去过的地方地图",
      "foot.admin.title": "管理员模式",
      "foot.admin.note": "使用 GitHub 个人访问令牌创建足迹 Issue。",
      "foot.admin.token": "GitHub 令牌",
      "foot.admin.place": "地点名称",
      "foot.admin.desc": "描述",
      "foot.admin.upload": "将图片拖拽到这里，或点击上传",
      "foot.admin.lat": "纬度",
      "foot.admin.lng": "经度",
      "foot.admin.submit": "创建足迹 Issue",
      "contact.title": "联系我",
      "contact.email": "邮箱",
      "contact.sendEmail": "发送邮件",
      "board.title": "留言板",
      "board.subtitle": "参考 QQ 空间风格的现代玻璃版",
      "board.name": "昵称",
      "board.message": "留言内容",
      "board.submit": "提交",
      "footer.copyright": "© <span id=\"year\"></span> b1owcar Studio. 保留所有权利。",
      "board.status.empty": "还没有留言，来留下第一条吧。",
      "board.status.needFields": "请填写昵称和留言内容。",
      "board.status.length": "输入内容超出长度限制。",
      "board.status.submitting": "提交中...",
      "board.status.success": "留言发送成功。",
      "board.status.fail": "发送失败。",
      "board.status.supabaseOk": "已连接 Supabase。",
      "board.status.localMode": "当前使用 localStorage 模式。",
      "board.status.supabaseFail": "Supabase 读取失败，已切换本地模式。"
    },
    "zh-TW": {
      "nav.about": "關於我",
      "nav.studio": "工作室",
      "nav.footprints": "我的足跡",
      "nav.contact": "聯絡我",
      "nav.board": "留言板",
      "lang.label": "語言",
      "about.title": "關於我",
      "about.p1": "我目前是一位在澳門工作的技術員。這裡是占位簡介，後續我會補上完整的個人介紹。",
      "about.p2": "我關注技術、設計與騎行工程，也喜歡把實用想法和視覺表達結合。",
      "studio.title": "b1owcar Studio",
      "studio.since": "成立於 2021",
      "studio.desc": "該工作室建立於 2021 年，屬於非營利性質，旨在發展個人興趣並持續產出作品。",
      "studio.card1.title": "Studio 定位",
      "studio.card1.desc": "一個個人創意實驗室，聚焦實用數位體驗、視覺語言和輕量技術探索。",
      "studio.card2.title": "個人專案展示",
      "studio.card2.desc": "用於展示網站概念、小型效率工具與設計導向作品的占位內容。",
      "studio.card3.title": "未來方向",
      "studio.card3.desc": "未來將持續圍繞 UI 系統、實用工具與騎行工程展開探索。",
      "foot.title": "我的足跡",
      "foot.subtitle": "我走過的地方地圖",
      "foot.admin.title": "管理員模式",
      "foot.admin.note": "使用 GitHub 個人存取權杖建立足跡 Issue。",
      "foot.admin.token": "GitHub 權杖",
      "foot.admin.place": "地點名稱",
      "foot.admin.desc": "描述",
      "foot.admin.upload": "將圖片拖曳到這裡，或點擊上傳",
      "foot.admin.lat": "緯度",
      "foot.admin.lng": "經度",
      "foot.admin.submit": "建立足跡 Issue",
      "contact.title": "聯絡我",
      "contact.email": "信箱",
      "contact.sendEmail": "發送郵件",
      "board.title": "留言板",
      "board.subtitle": "參考 QQ 空間風格的現代玻璃版",
      "board.name": "暱稱",
      "board.message": "留言內容",
      "board.submit": "提交",
      "footer.copyright": "© <span id=\"year\"></span> b1owcar Studio. 保留所有權利。",
      "board.status.empty": "尚無留言，來留下第一則吧。",
      "board.status.needFields": "請填寫暱稱與留言內容。",
      "board.status.length": "輸入內容超出長度限制。",
      "board.status.submitting": "提交中...",
      "board.status.success": "留言送出成功。",
      "board.status.fail": "送出失敗。",
      "board.status.supabaseOk": "已連線 Supabase。",
      "board.status.localMode": "目前使用 localStorage 模式。",
      "board.status.supabaseFail": "Supabase 讀取失敗，已切換本地模式。"
    },
    en: {
      "nav.about": "About",
      "nav.studio": "Studio",
      "nav.footprints": "My Footprints",
      "nav.contact": "Contact",
      "nav.board": "Message Board",
      "lang.label": "Language",
      "about.title": "About Me",
      "about.p1": "I am currently a technician based in Macau. This section is placeholder copy and will be updated soon.",
      "about.p2": "My interests include technology, design, and cycling engineering, combining practical ideas with visual expression.",
      "studio.title": "b1owcar Studio",
      "studio.since": "Since 2021",
      "studio.desc": "The studio was founded in 2021 as a non-profit space to develop personal interests and long-term creative work.",
      "studio.card1.title": "Studio Positioning",
      "studio.card1.desc": "A personal creative lab focused on practical digital experience, visual language, and lightweight technical exploration.",
      "studio.card2.title": "Personal Projects",
      "studio.card2.desc": "Placeholder area for website concepts, mini productivity tools, and design-driven personal projects.",
      "studio.card3.title": "Future Direction",
      "studio.card3.desc": "The next focus continues on UI systems, practical tools, and cycling engineering experiments.",
      "foot.title": "My Footprints",
      "foot.subtitle": "A map of the places I've been",
      "foot.admin.title": "Admin Mode",
      "foot.admin.note": "Use your GitHub Personal Access Token to create footprint issues.",
      "foot.admin.token": "GitHub Token",
      "foot.admin.place": "Place Name",
      "foot.admin.desc": "Description",
      "foot.admin.upload": "Drag image here or click to upload",
      "foot.admin.lat": "Latitude",
      "foot.admin.lng": "Longitude",
      "foot.admin.submit": "Create Footprint Issue",
      "contact.title": "Contact",
      "contact.email": "Email",
      "contact.sendEmail": "Send Email",
      "board.title": "Message Board",
      "board.subtitle": "QQ-space inspired, modern glass edition",
      "board.name": "Name",
      "board.message": "Message",
      "board.submit": "Submit",
      "footer.copyright": "© <span id=\"year\"></span> b1owcar Studio. All rights reserved.",
      "board.status.empty": "No messages yet. Be the first one.",
      "board.status.needFields": "Please fill in both Name and Message.",
      "board.status.length": "Input exceeds allowed length.",
      "board.status.submitting": "Submitting...",
      "board.status.success": "Message sent successfully.",
      "board.status.fail": "Failed to send message.",
      "board.status.supabaseOk": "Connected to Supabase.",
      "board.status.localMode": "Running in localStorage mode.",
      "board.status.supabaseFail": "Supabase read failed, switched to local mode."
    }
  };

  const defaultLang = localStorage.getItem("site-lang") || "zh-CN";
  let currentLang = i18n[defaultLang] ? defaultLang : "zh-CN";

  function t(key) {
    return i18n[currentLang][key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (text.includes("<span")) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    const yearNode = document.getElementById("year");
    if (yearNode) yearNode.textContent = new Date().getFullYear();
    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: currentLang } }));
  }

  const langTrigger = document.getElementById("lang-trigger");
  const langMenu = document.getElementById("lang-menu");
  langTrigger.addEventListener("click", () => {
    langMenu.classList.toggle("open");
  });
  langMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem("site-lang", currentLang);
      langMenu.classList.remove("open");
      applyTranslations();
    });
  });
  document.addEventListener("click", (event) => {
    if (!langMenu.contains(event.target) && !langTrigger.contains(event.target)) {
      langMenu.classList.remove("open");
    }
  });

  const form = document.getElementById("message-form");
  const list = document.getElementById("board-list");
  const statusText = document.getElementById("board-status");
  const cfg = window.SUPABASE_CONFIG || {};
  const hasSupabaseConfig = Boolean(cfg.url && cfg.anonKey && window.supabase);
  let supabase = null;

  if (hasSupabaseConfig) {
    supabase = window.supabase.createClient(cfg.url, cfg.anonKey);
  }

  const storageKey = "b1owcar-message-board";

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatTime(isoString) {
    try {
      return new Date(isoString).toLocaleString(currentLang);
    } catch (_error) {
      return "just now";
    }
  }

  function setStatus(text, isError) {
    statusText.textContent = text;
    statusText.style.color = isError ? "#ff9baa" : "#d4e9ff";
  }

  function loadLocalMessages() {
    const raw = localStorage.getItem(storageKey);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  }

  function saveLocalMessages(messages) {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }

  function renderMessages(messages) {
    if (!messages.length) {
      list.innerHTML =
        `<div class="glass-panel message-card empty-message">${t("board.status.empty")}</div>`;
      return;
    }

    list.innerHTML = messages
      .map(
        (item) => `
          <article class="glass-panel message-card">
            <div class="message-head">
              <span class="name">${escapeHtml(item.name)}</span>
              <span class="time">${formatTime(item.created_at)}</span>
            </div>
            <p>${escapeHtml(item.message)}</p>
          </article>
        `
      )
      .join("");
  }

  async function fetchMessages() {
    if (supabase) {
      const table = cfg.table || "messages";
      const { data, error } = await supabase
        .from(table)
        .select("name,message,created_at")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        setStatus(t("board.status.supabaseFail"), true);
        renderMessages(loadLocalMessages());
        return;
      }

      renderMessages(data || []);
      setStatus(t("board.status.supabaseOk"));
      return;
    }

    renderMessages(loadLocalMessages());
    setStatus(t("board.status.localMode"));
  }

  async function submitMessage(name, message) {
    if (supabase) {
      const table = cfg.table || "messages";
      const payload = { name, message };
      const { error } = await supabase.from(table).insert(payload);
      if (error) {
        throw new Error(error.message || "Supabase insert failed.");
      }
      return;
    }

    const current = loadLocalMessages();
    current.unshift({
      name,
      message,
      created_at: new Date().toISOString()
    });
    saveLocalMessages(current.slice(0, 20));
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !message) {
      setStatus(t("board.status.needFields"), true);
      return;
    }

    if (name.length > 32 || message.length > 300) {
      setStatus(t("board.status.length"), true);
      return;
    }

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = t("board.status.submitting");

    try {
      await submitMessage(name, message);
      form.reset();
      await fetchMessages();
      setStatus(t("board.status.success"));
    } catch (error) {
      setStatus(error.message || t("board.status.fail"), true);
    } finally {
      button.disabled = false;
      button.textContent = t("board.submit");
    }
  });

  applyTranslations();
  fetchMessages();
})();
