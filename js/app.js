// ===== Data =====
const STAMPS = [
  { id: 's1', name: '清代红印花加盖小字', dyn: '清代', year: '1897', face: '壹角银', cat: '经典', desc: '红印花加盖小字当壹圆是中国清代邮政珍邮之一，原票为红印花税票，加盖小字"当壹圆"后作为邮票使用。存世稀少，为华邮四宝之一。', prices: [
    { source: '中国嘉德 2024春', val: '¥287,500' },
    { source: '赵涌在线 2023秋', val: '¥253,000' },
    { source: '诚轩拍卖 2024', val: '¥195,500' },
  ]},
  { id: 's2', name: '大龙薄纸壹分', dyn: '清代', year: '1878', face: '壹分银', cat: '经典', desc: '大龙邮票是中国第一套邮票，薄纸版壹分银为早期版本。图案为云龙戏珠，寓意吉祥。是中国邮政史的起点。', prices: [
    { source: 'SPINK 2024', val: 'HK$38,000' },
    { source: '华夏拍卖 2023', val: '¥28,750' },
  ]},
  { id: 's3', name: '民国孙中山像', dyn: '民国', year: '1931', face: '贰圆', cat: '民国', desc: '伦敦版孙中山像邮票，由英国伦敦德纳罗公司雕刻印刷。孙中山侧面像线条细腻，印刷精良，是民国邮票的代表作。', prices: [
    { source: '赵涌在线 2024', val: '¥6,900' },
  ]},
  { id: 's4', name: '新中国梅兰芳M', dyn: '新中国', year: '1962', face: '8分+50分', cat: '纪特', desc: '梅兰芳舞台艺术小型张，纪94M。图案为梅兰芳《贵妃醉酒》剧照，是中国第一枚小型张，JT票之王。', prices: [
    { source: '中国嘉德 2024秋', val: '¥218,500' },
    { source: '诚轩 2024', val: '¥195,500' },
    { source: '赵涌 2023', val: '¥184,000' },
  ]},
  { id: 's5', name: '全国山河一片红', dyn: '新中国', year: '1968', face: '8分', cat: '文革', desc: '全国山河一片红（撤销发行）是新中国最著名的珍邮之一。因地图绘制问题被紧急撤销，少量流出。是中国邮票史上最具传奇色彩的品种。', prices: [
    { source: '中国嘉德 2024春', val: '¥1,035,000' },
    { source: 'SPINK 2023', val: 'HK$1,200,000' },
  ]},
  { id: 's6', name: '庚申年猴票', dyn: '新中国', year: '1980', face: '8分', cat: '生肖', desc: 'T46庚申年猴票，黄永玉设计，中国第一枚生肖邮票。原画为水墨写意风格，雕版套印，印刷精美。是新中国邮票的标志性品种。', prices: [
    { source: '赵涌在线 2024', val: '¥12,650' },
    { source: '中国嘉德 2024', val: '¥11,500' },
  ]},
  { id: 's7', name: '敦煌壁画小型张', dyn: '新中国', year: '1987', face: '2元', cat: '纪特', desc: 'T116M敦煌壁画小型张，图案为北魏·伎乐图。画面飞天造型优美，色彩绚丽，是中国传统文化题材邮票中的精品。', prices: [
    { source: '华夏拍卖 2024', val: '¥4,025' },
  ]},
  { id: 's8', name: '清代万寿纪念票', dyn: '清代', year: '1894', face: '贰分', cat: '经典', desc: '慈禧太后六十寿辰纪念邮票，俗称"万寿票"。是中国第一套纪念邮票，图案为五福捧寿等吉祥纹样。', prices: [
    { source: 'SPINK 2024春', val: 'HK$15,000' },
  ]},
];

const COLLECTIONS = ['s1', 's4', 's5', 's6'];

// ===== Utility =====
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

function showPage(id) {
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === id));
  window.scrollTo(0, 0);
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove('show'), 2000);
}

function toggleFav(id) {
  const idx = COLLECTIONS.indexOf(id);
  if (idx >= 0) COLLECTIONS.splice(idx, 1);
  else COLLECTIONS.push(id);
  renderStampGrid();
  renderFavorites();
  renderRecent();
}

// ===== Render Functions =====
function renderRecent() {
  const container = document.getElementById('recent-list');
  const recent = STAMPS.slice(0, 4);
  container.innerHTML = recent.map(s => `
    <div class="recent-card" onclick="showDetail('${s.id}')">
      <div class="thumb">邮</div>
      <div class="info">
        <div class="title">${s.name}</div>
        <div class="meta">${s.dyn} · ${s.year}</div>
      </div>
    </div>
  `).join('');
}

function renderStampGrid() {
  const grid = document.getElementById('stamp-grid');
  grid.innerHTML = STAMPS.filter(s => COLLECTIONS.includes(s.id)).length === 0
    ? '<div class="empty-state" style="grid-column:1/-1"><div class="icon">📭</div><p>还没有收藏邮票<br>去"首页"发现更多</p></div>'
    : STAMPS.filter(s => COLLECTIONS.includes(s.id)).map(s => `
      <div class="stamp-card" onclick="showDetail('${s.id}')">
        <div class="thumb">邮</div>
        <div class="info">
          <div class="name">${s.name}</div>
          <div class="price">${s.prices[0].val}</div>
        </div>
      </div>
    `).join('');
}

function renderFavorites() {
  const grid = document.getElementById('fav-grid');
  if (!grid) return;
  const cat = $('#fav-grid').dataset.cat || 'all';
  let list = cat === 'all' ? STAMPS : STAMPS.filter(s => s.cat === cat);
  grid.innerHTML = list.length === 0
    ? '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><p>没有匹配的结果</p></div>'
    : list.map(s => `
      <div class="stamp-card" onclick="showDetail('${s.id}')">
        <div class="thumb">邮</div>
        <div class="info">
          <div class="name">${s.name}</div>
          <div class="price">${s.prices[0].val}</div>
        </div>
      </div>
    `).join('');
}

function renderAuction() {
  const list = document.getElementById('auction-list');
  if (!list) return;
  const items = [
    { src: '中国嘉德', title: '2024秋季拍卖会', lot: 'LOT 1523', item: '全国山河一片红', price: '¥1,035,000', time: '11月20日' },
    { src: 'SPINK', title: '2024香港邮票专场', lot: 'LOT 208', item: '红印花小字当壹圆', price: 'HK$420,000', time: '12月5日' },
    { src: '赵涌在线', title: '2024年11月场', lot: 'LOT 671', item: '梅兰芳小型张', price: '¥201,250', time: '11月15日' },
    { src: '诚轩拍卖', title: '2024秋季邮品专场', lot: 'LOT 335', item: '大龙薄纸全套', price: '¥86,250', time: '12月8日' },
  ];
  list.innerHTML = items.map(i => `
    <div class="recent-card" style="width:160px">
      <div class="info" style="padding:var(--space-md)">
        <div style="font-size:11px;color:var(--color-accent);font-weight:600">${i.src}</div>
        <div style="font-size:13px;font-weight:600;margin:4px 0 2px">${i.title}</div>
        <div style="font-size:11px;color:var(--color-muted)">${i.item}</div>
        <div style="font-size:14px;color:var(--color-danger);font-weight:700;margin-top:4px">${i.price}</div>
      </div>
    </div>
  `).join('');
}

function renderStats() {
  const vals = $$('.home-stat .num');
  if (vals.length >= 3) {
    vals[0].textContent = STAMPS.length;
    vals[1].textContent = COLLECTIONS.length;
    vals[2].textContent = '¥' + (STAMPS.reduce((s, i) => s + parseInt(i.prices[0].val.replace(/[^0-9]/g,'')), 0) / 10000).toFixed(0) + '万';
  }
}

// ===== Detail =====
function showDetail(id) {
  const s = STAMPS.find(x => x.id === id);
  if (!s) return;
  showPage('page-detail');
  const liked = COLLECTIONS.includes(id);
  $('#detail-hero').textContent = '邮';
  $('#detail-title').textContent = s.name;
  $('#detail-fav-btn').className = 'detail-fav' + (liked ? ' liked' : '');
  $('#detail-fav-btn').innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  $('#detail-fav-btn').onclick = () => { toggleFav(id); showDetail(id); };
  $('#detail-grid').innerHTML = `
    <div class="detail-item"><div class="label">年代</div><div class="value">${s.dyn}</div></div>
    <div class="detail-item"><div class="label">发行年份</div><div class="value">${s.year}</div></div>
    <div class="detail-item"><div class="label">面值</div><div class="value">${s.face}</div></div>
    <div class="detail-item"><div class="label">分类</div><div class="value">${s.cat}</div></div>
  `;
  $('#detail-desc').innerHTML = `<h3>藏品介绍</h3><p>${s.desc}</p>`;
  $('#detail-price').innerHTML = `
    <h3>拍卖纪录</h3>
    ${s.prices.map(p => `
      <div class="price-row">
        <span class="price-source">${p.source}</span>
        <span class="price-value">${p.val}</span>
      </div>
    `).join('')}
  `;
}

// ===== Add Stamp =====
function handleAdd(e) {
  e.preventDefault();
  const name = $('#add-name').value.trim();
  if (!name) { toast('请输入邮票名称'); return; }
  toast('✅ 录入成功！');
  $('#add-form').reset();
  setTimeout(() => showPage('page-collect'), 800);
}

// ===== filter chips =====
function initFilters() {
  $$('.filter-chip').forEach(chip => {
    chip.onclick = () => {
      $$('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const grid = document.getElementById('fav-grid');
      if (grid) {
        grid.dataset.cat = chip.dataset.cat;
        renderFavorites();
      }
    };
  });
}

// ===== Search =====
function initSearch() {
  const input = $('#market-search');
  if (!input) return;
  input.oninput = () => {
    const q = input.value.toLowerCase();
    const grid = document.getElementById('fav-grid');
    if (!grid) return;
    const cats = q ? STAMPS.filter(s => s.name.includes(q) || s.dyn.includes(q) || s.cat.includes(q)) : STAMPS;
    grid.innerHTML = cats.length === 0
      ? '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><p>没有匹配的结果</p></div>'
      : cats.map(s => `
        <div class="stamp-card" onclick="showDetail('${s.id}')">
          <div class="thumb">邮</div>
          <div class="info">
            <div class="name">${s.name}</div>
            <div class="price">${s.prices[0].val}</div>
          </div>
        </div>
      `).join('');
  };
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderRecent();
  renderStampGrid();
  renderFavorites();
  renderAuction();
  renderStats();

  // Navigation
  $$('.nav-item').forEach(n => n.addEventListener('click', () => {
    showPage(n.dataset.page);
    if (n.dataset.page === 'page-collect') renderStampGrid();
    if (n.dataset.page === 'page-market') renderFavorites();
  }));

  // Back buttons
  $$('.back-btn').forEach(b => b.addEventListener('click', () => {
    showPage('page-home');
  }));

  // Add form
  const af = document.getElementById('add-form');
  if (af) af.onsubmit = handleAdd;

  // Quick actions
  $$('.home-action').forEach(a => a.addEventListener('click', () => {
    const target = a.dataset.page;
    if (target === 'page-add') showPage(target);
    else if (target) showPage(target);
  }));

  initFilters();
  initSearch();

  // Install banner
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-banner').classList.add('show');
  });
  document.getElementById('install-btn').onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        document.getElementById('install-banner').classList.remove('show');
        toast('✅ 已安装到桌面');
      }
      deferredPrompt = null;
    }
  };
  document.getElementById('close-banner').onclick = () => {
    document.getElementById('install-banner').classList.remove('show');
  };
});
