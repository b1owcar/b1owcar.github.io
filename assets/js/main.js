(function () {
  const i18n = {
    "zh-CN": {
      "nav.about": "关于我",
      "nav.works": "工作与项目",
      "nav.studio": "工作室",
      "nav.footprints": "我的足迹",
      "nav.contact": "联系我",
      "nav.board": "留言板",
      "lang.label": "语言",
      "about.title": "关于我",
      "about.greeting": "致访问本站的每一位朋友：",
      "about.p1": "我目前在澳门担任实验室技术员，负责实验室系统维护、全栈开发等工作。此前，我曾在广州某高校担任实验室技术员兼教师，在此期间本人获得了中国内地的高校教师资格证以及CISE(注册信息安全工程师)证书，从事实验室管理、本科教学及毕业论文指导工作，同时具备企业 IT 支持与基础设施维护经验。",
      "about.p2": "工作之外，我有着广泛的兴趣爱好。我热爱摄影、自驾游、骑行、羽毛球、足球，也痴迷于电脑外设与数码产品；闲暇时还喜欢游戏、烹饪与调酒 —— 这些爱好让我保持活力、保持好奇、保持生活的平衡。",
      "about.p3": "我始终坚持持续学习，探索网络安全、技术与教育的交叉领域；目前正在备考OSCP证书以及准备在2027年秋季开始攻读博士学位。除职业目标之外，我也不断追寻人生的意义，探求对自己真正重要的事物。",
      "about.p4": "希望你在我的个人网站上，玩得愉快！",
      "works.title": "工作与项目",
      "works.subtitle": "工作、教育、项目与课程",
      "works.content":
        "<h3>项目</h3><p>本网站（2026年4月起）</p><p>澳科大创客空间预约系统（2025年8月-至今）</p><p><em>负责全栈开发与系统运维，涵盖前后端实现、部署及日常维护</em></p><p>留学生菜谱 链接：<a href=\"https://github.com/b1owcar/cooking_recipe\" target=\"_blank\" rel=\"noreferrer\">https://github.com/b1owcar/cooking_recipe</a>（2023年2月-至今）</p><p><em>与留学期间的同伴共同创建</em></p><h3>课程</h3><p><strong>以下为本人在广州软件学院相关的课程</strong></p><p>服务器自动化管理与运维 NF3002 首任课程负责人，课程创建者（2024/25 第一学期）</p><p>网络自动化部署与运维 NF3004 课程设计与开发负责人（2024/25 第二学期）</p><p><em>主导课程体系设计、教学内容规划及交接，对后续教学实施提供支持</em></p><p>计算机网络 NN1015 实验课教师（2024/25 第二学期）</p><h3>证书</h3><p>中国人民共和国教师资格证：高等学校-网络空间安全（2024年12月18日起）</p><p>注册信息安全工程师（2025年3月26日至2028年3月25日）</p>",
      "studio.title": "b1owcar Studio",
      "studio.content":
        "<h3>名字的由来</h3><p>b1owcar Studio 的名字源自一个颇具个人色彩的网络梗。古天乐先生的《贪玩蓝月》广告走红后，他早期的港普广告也被网友重新挖出，而我在 wargame 群的昵称正好是“我今天就要来炸死这辆车”。群友们便开始叫我“炸车”，这个称呼逐渐成为我的网络身份，也自然演变成工作室的名字。</p><p>工作室的 Logo 也基于这个梗设计，在此特别感谢好友 RussianTom 的协助与灵感支持。</p><p>链接：<a href=\"https://www.bilibili.com/video/BV1fx411B7Ag\" target=\"_blank\" rel=\"noreferrer\">https://www.bilibili.com/video/BV1fx411B7Ag</a></p><h3>工作室的定位</h3><p>在正式成立之前，我主要以个人名义帮助校内同学处理电脑相关问题，从软件故障到硬件维修都曾参与。2019 年购入相机后，也尝试过风景与人像拍摄，记录生活、积累创作经验。</p><p>虽然工作室名义上成立已久，但由于需要兼顾学业，它更多扮演的是一个“兴趣实验室”的角色——一个让我探索技术、视觉与创作的空间，而非商业项目。</p><h3>未来发展</h3><p>目前我仍处于能力积累阶段，需要继续考证、深造，也清楚自己还有许多需要提升的地方。因此，短期内工作室仍将保持非盈利性质，继续作为个人学习与创作的延伸。</p><p>当未来技术水平与经验更成熟时，b1owcar Studio 将逐步考虑开展更专业的技术支持、影像创作或小型项目合作，让它从兴趣起点自然成长为一个兼具专业性与个人风格的创作平台。</p>",
      "foot.title": "我的足迹",
      "foot.subtitle": "",
      "contact.title": "联系我",
      "contact.email": "邮箱",
      "contact.sendEmail": "发送邮件",
      "board.title": "留言板",
      "board.subtitle": "欢迎留言",
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
      "board.status.supabaseOk": "留言板已就绪。",
      "board.status.localMode": "留言板已就绪。",
      "board.status.supabaseFail": "留言服务暂时不可用，已切换备用模式。"
    },
    "zh-TW": {
      "nav.about": "關於我",
      "nav.works": "工作與專案",
      "nav.studio": "工作室",
      "nav.footprints": "我的足跡",
      "nav.contact": "聯絡我",
      "nav.board": "留言板",
      "lang.label": "語言",
      "about.title": "關於我",
      "about.greeting": "致訪問本站的每一位朋友：",
      "about.p1": "我目前在澳門擔任實驗室技術員，負責實驗室系統維護、全端開發等工作。此前，我曾在廣州某大專院校擔任實驗室技術員兼教師，期間取得中國內地高校教師資格證及 CISE（註冊資訊安全工程師）證書，從事實驗室管理、本科教學及畢業論文指導工作，同時具備企業 IT 支援與基礎設施維護經驗。",
      "about.p2": "工作之餘，我有著廣泛的興趣愛好。我熱愛攝影、自駕遊、單車、羽毛球、足球，亦癡迷於電腦週邊設備與數碼產品；空閒時還喜歡遊戲、烹飪與調酒 —— 這些愛好讓我保持活力、保持好奇、保持生活的平衡。",
      "about.p3": "我始終堅持持續學習，探索網絡安全、科技與教育的跨界領域；目前正備考 OSCP 證書，並計劃於 2027 年秋季攻讀博士學位。除職業目標以外，我亦不斷追尋人生的意義，探求對自己真正重要的事物。",
      "about.p4": "希望你在我的個人網站裡，玩得愉快！",
      "works.title": "工作與專案",
      "works.subtitle": "工作、教育、專案與課程",
      "works.content":
        "<h3>項目</h3><p><strong>本網站</strong>（2026年4月起）</p><p><strong>澳科大創客空間預約系統</strong>（2025年8月－至今）<br/>負責全棧開發及系統運維，涵蓋前後端實現、部署及日常維護</p><p><strong>留學生菜譜</strong>（2023年2月－至今）<br/>GitHub：<a href=\"https://github.com/b1owcar/cooking_recipe\" target=\"_blank\" rel=\"noreferrer\">https://github.com/b1owcar/cooking_recipe</a><br/>與留學期間之同伴共同建立</p><h3>課程</h3><p><strong>以下為本人於廣州軟件學院參與之課程</strong></p><p><strong>伺服器自動化管理與運維（NF3002）</strong><br/>首任課程負責人、課程創建者（2024/25 第一學期）</p><p><strong>網絡自動化部署與運維（NF3004）</strong><br/>課程設計與開發負責人（2024/25 第二學期）<br/>主導課程體系設計、教學內容規劃及交接，並為後續教學實施提供支援</p><p><strong>計算機網絡（NN1015）</strong><br/>實驗課教師（2024/25 第二學期）</p><h3>證書</h3><p>中華人民共和國教師資格證（高等學校・網絡空間安全，2024年12月18日起）</p><p>註冊信息安全工程師（2025年3月26日至2028年3月25日）</p>",
      "studio.title": "b1owcar Studio",
      "studio.content":
        "<h3>名字的由來</h3><p>b1owcar Studio 的名字源自一個帶有個人色彩的網絡趣事。古天樂先生的《貪玩藍月》廣告爆紅後，他早期的港普廣告亦被網民重新翻出，而我在 wargame 群組的暱稱正好是「我今天就要來炸死這輛車」。群友們便開始叫我「炸車」，這個稱呼逐漸成為我的網絡身份，亦自然演變成工作室的名字。</p><p>工作室的 Logo 亦是基於這個梗而設計，在此特別感謝好友 RussianTom 的協助與靈感支持。</p><p>鏈接：<a href=\"https://www.bilibili.com/video/BV1fx411B7Ag\" target=\"_blank\" rel=\"noreferrer\">https://www.bilibili.com/video/BV1fx411B7Ag</a></p><h3>工作室的定位</h3><p>在正式成立之前，我主要以個人名義協助校內同學處理電腦相關問題，從軟件故障到硬件維修都有涉獵。2019 年購入相機後，我亦曾嘗試拍攝風景與人像，記錄生活並累積創作經驗。</p><p>雖然工作室名義上成立已久，但因需兼顧學業，它更多是一個「興趣實驗室」——一個讓我探索技術、視覺與創作的空間，而非商業項目。</p><h3>未來發展</h3><p>目前我仍處於能力累積階段，需要繼續考證與深造，也明白自己仍有不少地方需要提升。因此，短期內工作室仍會維持非盈利性質，作為個人學習與創作的延伸。</p><p>待未來技術水平與經驗更成熟後，b1owcar Studio 將會逐步考慮開展更專業的技術支援、影像創作或小型合作項目，讓它從興趣起點自然成長為一個兼具專業性與個人風格的創作平台。</p>",
      "foot.title": "我的足跡",
      "foot.subtitle": "",
      "contact.title": "聯絡我",
      "contact.email": "信箱",
      "contact.sendEmail": "發送郵件",
      "board.title": "留言板",
      "board.subtitle": "歡迎留言",
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
      "board.status.supabaseOk": "留言板已就緒。",
      "board.status.localMode": "留言板已就緒。",
      "board.status.supabaseFail": "留言服務暫時不可用，已切換備援模式。"
    },
    en: {
      "nav.about": "About",
      "nav.works": "Works & Projects",
      "nav.studio": "Studio",
      "nav.footprints": "My Footprints",
      "nav.contact": "Contact",
      "nav.board": "Message Board",
      "lang.label": "Language",
      "about.title": "About Me",
      "about.greeting": "To whoever is visiting this site:",
      "about.p1": "I currently serve as a Lab Technician in Macau, overseeing lab system maintenance, full-stack development, and other related work. Previously, I worked as a Lab Technician and Lecturer at a university in Guangzhou, during which I obtained my Mainland China University Teaching Qualification and CISE (Certified Information Security Engineer) certification. I was engaged in lab management, undergraduate teaching, and dissertation supervision, and I also come with industry experience in IT support and infrastructure maintenance.",
      "about.p2": "Outside of work, I have a wide range of interests. I love photography, road trips, cycling, playing badminton and football, and I am deeply passionate about computer peripherals and digital gadgets. I also enjoy gaming, cooking and cocktail mixing in my spare time. These hobbies keep me energetic, curious, and balanced.",
      "about.p3": "I am committed to continuous learning and exploring the intersection of cybersecurity, technology, and education. I am currently preparing for the OSCP certification and planning to pursue a PhD starting in the fall of 2027. Beyond professional goals, I also seek to explore the meaning of life and pursue what truly matters to me.",
      "about.p4": "Hope you enjoy your stay here!",
      "works.title": "Works & Projects",
      "works.subtitle": "Work, Education, Projects and Courses",
      "works.content":
        "<h3>Projects</h3><p><strong>Personal Website</strong> (Apr 2026 – Present)</p><p><strong>MUST Maker Space Reservation System</strong> (Aug 2025 – Present)<br/>Responsible for full-stack development and system operations, including frontend/backend implementation, deployment, and maintenance</p><p><strong>Overseas Student Recipes</strong> (Feb 2023 – Present)<br/>GitHub: <a href=\"https://github.com/b1owcar/cooking_recipe\" target=\"_blank\" rel=\"noreferrer\">https://github.com/b1owcar/cooking_recipe</a><br/>Co-created with peers during overseas study</p><h3>Teaching & Course Development</h3><p><em>Courses delivered at Guangzhou University of Software</em></p><p><strong>Server Automation Management and Operations (NF3002)</strong><br/>Founding Course Leader & Creator (2024/25 Semester 1)</p><p><strong>Network Automation Deployment and Operations (NF3004)</strong><br/>Course Design and Development Lead (2024/25 Semester 2)<br/>Led curriculum architecture design, content planning, and handover; supported subsequent teaching delivery</p><p><strong>Computer Networks (NN1015)</strong><br/>Laboratory Instructor (2024/25 Semester 2)</p><h3>Certifications</h3><p>PRC Teacher Qualification Certificate (Higher Education – Cyberspace Security, from Dec 18, 2024)</p><p>Certified Information Security Engineer (Mar 26, 2025 – Mar 25, 2028)</p>",
      "studio.title": "b1owcar Studio",
      "studio.content":
        "<h3>Origins</h3><p>The name b1owcar Studio comes from an internet meme. After Louis Koo's \"Greedy Blue Moon\" commercial went viral, many of his older Cantonese-Mandarin ads resurfaced online. Around the same time, my nickname in a wargame group happened to be \"I'm going to blow up this car today.\" Friends in the group started calling me \"blowcar,\" and the name eventually became part of my online identity — naturally evolving into the studio's name.</p><p>The studio's logo was also designed around this reference, with special thanks to my friend RussianTom for his creative support.</p><p>Video link: <a href=\"https://www.bilibili.com/video/BV1fx411B7Ag\" target=\"_blank\" rel=\"noreferrer\">https://www.bilibili.com/video/BV1fx411B7Ag</a></p><h3>Studio Positioning</h3><p>Before the studio was formally established, I mainly helped schoolmates with computer-related issues — from software troubleshooting to hardware repairs. After purchasing my first camera in 2019, I also explored landscape and portrait photography, documenting life and building creative experience.</p><p>Although the studio has existed in name for some time, academic commitments meant it functioned more like a personal \"creative lab\" — a space for exploring technology, visuals, and ideas, rather than a commercial venture.</p><h3>Future Development</h3><p>I am currently still in a growth phase, preparing for certifications and further studies, and I recognize that there is still much to improve. For now, the studio will remain non-profit, continuing as an extension of my learning and creative practice.</p><p>When my technical skills and experience reach a more mature stage, b1owcar Studio may gradually take on more professional technical support, photography work, or small collaborative projects — evolving naturally into a platform that blends personal style with professional capability.</p>",
      "foot.title": "My Footprints",
      "foot.subtitle": "",
      "contact.title": "Contact",
      "contact.email": "Email",
      "contact.sendEmail": "Send Email",
      "board.title": "Message Board",
      "board.subtitle": "Leave a message",
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
      "board.status.supabaseOk": "Message board is ready.",
      "board.status.localMode": "Message board is ready.",
      "board.status.supabaseFail": "Message service is temporarily unavailable. Switched to fallback mode."
    }
  };

  const defaultLang = localStorage.getItem("site-lang") || "zh-CN";
  let currentLang = i18n[defaultLang] ? defaultLang : "zh-CN";
  const macauLat = 22.1987;
  const macauLng = 113.5439;
  const macauTimeZone = "Asia/Macau";
  const sunCacheKey = "macau-sun-times";

  function t(key) {
    return i18n[currentLang][key] || key;
  }


  function applyTheme(theme) {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === theme) return;
    document.body.setAttribute("data-theme", theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  function getMacauNowParts() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: macauTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());

    const map = {};
    parts.forEach((part) => {
      if (part.type !== "literal") map[part.type] = part.value;
    });

    return {
      date: `${map.year}-${map.month}-${map.day}`,
      minutes: Number(map.hour) * 60 + Number(map.minute)
    };
  }

  function toMacauMinutes(isoString) {
    const date = new Date(isoString);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: macauTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(date);
    const map = {};
    parts.forEach((part) => {
      if (part.type !== "literal") map[part.type] = part.value;
    });
    return Number(map.hour) * 60 + Number(map.minute);
  }

  function decideThemeBySunriseSunset(sunriseIso, sunsetIso) {
    const sunriseMin = toMacauMinutes(sunriseIso);
    const sunsetMin = toMacauMinutes(sunsetIso);
    const nowMin = getMacauNowParts().minutes;
    return nowMin >= sunriseMin && nowMin < sunsetMin ? "light" : "dark";
  }

  function readSunCache() {
    try {
      return JSON.parse(localStorage.getItem(sunCacheKey) || "null");
    } catch (_error) {
      return null;
    }
  }

  function writeSunCache(payload) {
    localStorage.setItem(sunCacheKey, JSON.stringify(payload));
  }

  async function fetchSunTimesForDate(dateStr) {
    const url = `https://api.sunrise-sunset.org/json?lat=${macauLat}&lng=${macauLng}&date=${dateStr}&formatted=0`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.status !== "OK") {
      throw new Error("sun api error");
    }
    return data.results;
  }

  async function syncThemeByMacauSun() {
    const macauNow = getMacauNowParts();
    try {
      let sunData = readSunCache();
      if (!sunData || sunData.date !== macauNow.date) {
        const results = await fetchSunTimesForDate(macauNow.date);
        sunData = {
          date: macauNow.date,
          sunrise: results.sunrise,
          sunset: results.sunset
        };
        writeSunCache(sunData);
      }
      applyTheme(decideThemeBySunriseSunset(sunData.sunrise, sunData.sunset));
    } catch (_error) {
      const fallbackTheme = macauNow.minutes >= 7 * 60 && macauNow.minutes < 19 * 60 ? "light" : "dark";
      applyTheme(fallbackTheme);
    }
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (text.includes("<")) {
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
  if (langTrigger && langMenu) {
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
  }

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
  syncThemeByMacauSun();
  setInterval(syncThemeByMacauSun, 30 * 60 * 1000);
  fetchMessages();
})();
