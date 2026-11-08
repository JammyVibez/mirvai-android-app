/* MIRVAI — Calm luxury property discovery */

const islandFeatured = {
  area: 'Lagos Island',
  type: 'Terrace Duplex',
  title: 'The Limestone Townhouse',
  imgClass: 'island'
};

const mainlandFeatured = {
  area: 'Lagos Mainland',
  type: 'Family Residence',
  title: 'The Garden Courtyard House',
  imgClass: 'mainland'
};

const islandSelected = [
  { title: 'Palm Court Villa', loc: 'Ikoyi', img: '' },
  { title: 'Harbour Residences', loc: 'Victoria Island', img: 'alt1' },
  { title: 'Banana Island Suite', loc: 'Banana Island', img: 'alt2' }
];

const mainlandSelected = [
  { title: 'GRA Townhouse', loc: 'Ikeja GRA', img: 'alt1' },
  { title: 'Yaba Modern Flat', loc: 'Yaba', img: '' },
  { title: 'Surulere Family Home', loc: 'Surulere', img: 'alt2' }
];

let currentArea = 'island';

function renderFeatured() {
  const f = currentArea === 'island' ? islandFeatured : mainlandFeatured;
  const el = document.getElementById('featuredCard');
  if (!el) return;
  el.innerHTML = `
    <article class="feat-card" onclick="showToast('Property detail — connect live inventory')">
      <div class="feat-img ${f.imgClass}"></div>
      <div class="feat-body">
        <div class="feat-meta">${f.area} · ${f.type}</div>
        <div class="feat-title">
          <span>${f.title}</span>
          <span class="feat-arrow">→</span>
        </div>
      </div>
    </article>
  `;
}

function renderSelected() {
  const list = currentArea === 'island' ? islandSelected : mainlandSelected;
  const el = document.getElementById('selectedRow');
  if (!el) return;
  el.innerHTML = list.map(p => `
    <article class="mini-card" onclick="showToast('${p.title} — connect live inventory')">
      <div class="mini-img ${p.img}"></div>
      <div class="mini-body">
        <h4>${p.title}</h4>
        <div class="mini-loc">${p.loc}</div>
      </div>
    </article>
  `).join('');
}

function setArea(area, btn) {
  currentArea = area;
  document.querySelectorAll('.area-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFeatured();
  renderSelected();
}

function navigate(id, el) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === id);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderSelected();
});
