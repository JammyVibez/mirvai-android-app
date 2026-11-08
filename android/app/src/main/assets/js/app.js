/* MIRVAI Luxury Real Estate App — Prototype */

const properties = [
  {
    id: 1,
    type: 'House',
    title: 'Contemporary Duplex',
    location: 'Lekki, Lagos',
    price: 'Price on request',
    tag: 'Featured',
    search: 'lekki house duplex contemporary',
    imgClass: ''
  },
  {
    id: 2,
    type: 'Land',
    title: 'Residential Land',
    location: 'Ibeju-Lekki, Lagos',
    price: 'Price on request',
    tag: 'Land',
    search: 'ibeju lekki land plots residential',
    imgClass: 'land'
  },
  {
    id: 3,
    type: 'House',
    title: 'Waterfront Villa',
    location: 'Ikoyi, Lagos',
    price: 'Price on request',
    tag: 'Exclusive',
    search: 'ikoyi villa waterfront house',
    imgClass: ''
  },
  {
    id: 4,
    type: 'Commercial',
    title: 'Office Suite',
    location: 'Victoria Island, Lagos',
    price: 'Price on request',
    tag: 'Commercial',
    search: 'victoria island office commercial',
    imgClass: 'commercial'
  },
  {
    id: 5,
    type: 'Land',
    title: 'Investment Plots',
    location: 'Epe, Lagos',
    price: 'Price on request',
    tag: 'Investment',
    search: 'epe land investment plots',
    imgClass: 'land'
  },
  {
    id: 6,
    type: 'House',
    title: 'Modern Terrace',
    location: 'Chevron, Lekki',
    price: 'Price on request',
    tag: 'New',
    search: 'chevron lekki terrace house modern',
    imgClass: ''
  }
];

let currentFilter = 'All';
let currentView = 'home';

function createPropertyCard(p) {
  return `
    <article class="property-card" data-type="${p.type}" data-search="${p.search}" onclick="showToast('Listing detail — connect live inventory & CRM')">
      <div class="prop-img ${p.imgClass}">
        <span class="tag">${p.tag}</span>
      </div>
      <div class="prop-info">
        <h4>${p.title}</h4>
        <div class="location">${p.location}</div>
        <div class="price">${p.price}</div>
      </div>
    </article>
  `;
}

function renderProperties(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(createPropertyCard).join('');
}

function filterType(type, el) {
  currentFilter = type;

  document.querySelectorAll('.chip').forEach(c => {
    const t = c.dataset.type;
    if (t) c.classList.toggle('active', t === type);
  });

  const filtered = type === 'All'
    ? properties
    : properties.filter(p => p.type === type);

  const homeList = filtered.slice(0, 2);
  renderProperties('propertyCards', homeList);
  renderProperties('propertyCards2', filtered);
}

function navigate(id, el) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.nav === id);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentView = id;

  if (id === 'properties') {
    filterType(currentFilter, null);
  }
}

function searchProperties() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  navigate('properties');

  let filtered = properties;
  if (currentFilter !== 'All') {
    filtered = filtered.filter(p => p.type === currentFilter);
  }
  if (q) {
    filtered = filtered.filter(p =>
      (p.search + ' ' + p.title + ' ' + p.location).toLowerCase().includes(q)
    );
  }

  renderProperties('propertyCards2', filtered);

  if (q && filtered.length === 0) {
    showToast('No matches in sample data — connect verified live inventory to search.');
  } else if (q) {
    showToast(`${filtered.length} result${filtered.length !== 1 ? 's' : ''} found (sample data)`);
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    t.style.display = 'none';
  }, 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  filterType('All', null);
});
