/* ═══════════════════════════════════════
   AUSTROINDIE — Shared JavaScript
═══════════════════════════════════════ */

// ── Navbar scroll behaviour ──
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Mobile menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  reveals.forEach(r => observer.observe(r));
});

// ── Products data store (localStorage) ──
const STORE_KEY = 'austroindie_products';

function getProducts() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || getDefaultProducts();
  } catch { return getDefaultProducts(); }
}

function saveProducts(products) {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
}

function getDefaultProducts() {
  return [
    { id:1, name:'Kanjivaram Silk Saree',       category:'sarees',     price:3499, badge:'Silk',      img:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80', desc:'Exquisite hand-woven Kanjivaram silk with golden zari borders.' },
    { id:2, name:'Banarasi Georgette Saree',     category:'sarees',     price:2199, badge:'Georgette', img:'https://images.unsplash.com/photo-1594938298603-27c69c2dba5d?w=500&q=80', desc:'Lightweight Banarasi georgette with delicate floral motifs.' },
    { id:3, name:'Chanderi Cotton Saree',        category:'sarees',     price:1599, badge:'Cotton',    img:'https://images.unsplash.com/photo-1617627143233-8ab50c6e8a59?w=500&q=80', desc:'Breezy Chanderi cotton perfect for festive daywear.' },
    { id:4, name:'Organza Embroidered Saree',    category:'sarees',     price:2899, badge:'Organza',   img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', desc:'Sheer organza with hand-embroidered floral sprigs.' },
    { id:5, name:'Kundan Bridal Set',            category:'jewellery',  price:1299, badge:'Necklace',  img:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80', desc:'Regal kundan choker with matching earrings and maangtikka.' },
    { id:6, name:'Gold Jhumka Set',              category:'jewellery',  price:549,  badge:'Earrings',  img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80', desc:'Classic temple-bell jhumkas in antique gold finish.' },
    { id:7, name:'Meenakari Bangle Set',         category:'jewellery',  price:699,  badge:'Bangles',   img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80', desc:'Hand-painted meenakari bangles in vibrant hues.' },
    { id:8, name:'Pearl Maang Tikka',            category:'jewellery',  price:449,  badge:'Headpiece', img:'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&q=80', desc:'Delicate pearl and kundan maang tikka for bridal elegance.' },
    { id:9, name:'Floral Ceramic Vase',          category:'decor',      price:899,  badge:'Home',      img:'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&q=80', desc:'Hand-painted ceramic vase with Mughal floral motifs.' },
    { id:10,name:'Scented Candle Set',           category:'decor',      price:749,  badge:'Lighting',  img:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80', desc:'Rose and sandalwood scented candles in gold-rimmed vessels.' },
    { id:11,name:'Madhubani Wall Art',           category:'decor',      price:1199, badge:'Wall Décor',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', desc:'Authentic Madhubani painting on handmade paper.' },
    { id:12,name:'Antique Brass Diya',           category:'decor',      price:649,  badge:'Brass',     img:'https://images.unsplash.com/photo-1578898886252-b6d4b8f75638?w=500&q=80', desc:'Hand-cast brass diya with intricate filigree patterns.' },
  ];
}

// ── Render a product card ──
function renderProductCard(product, delay = 0) {
  const waText = encodeURIComponent(`Hi AustroIndie! I'd like to order: ${product.name} (₹${product.price.toLocaleString()})`);
  return `
    <div class="product-card reveal" style="transition-delay:${delay}s">
      <div class="img-wrap">
        <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80'"/>
      </div>
      <div class="card-body">
        <div class="royal-badge" style="margin-bottom:8px">${product.badge}</div>
        <h4 style="font-family:var(--font-display);font-style:italic;font-size:1.05rem;color:var(--crimson);line-height:1.3;margin:4px 0">${product.name}</h4>
        <p style="font-family:var(--font-body);font-size:13px;color:var(--warm-gray);margin:6px 0 4px;line-height:1.6">${product.desc || ''}</p>
        <p style="font-family:var(--font-body);font-size:14px;color:var(--warm-gray);font-weight:600;margin-bottom:12px">₹${product.price.toLocaleString()}</p>
        <a href="https://wa.me/919999999999?text=${waText}" target="_blank" class="btn-wa">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.528 5.84L.057 23.5l5.797-1.499A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.6-.497-5.11-1.367l-.366-.218-3.44.889.921-3.32-.239-.384A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Order on WhatsApp
        </a>
      </div>
    </div>`;
}

// ── Contact form → WhatsApp ──
function sendViaWhatsApp() {
  const name = document.getElementById('cName')?.value || 'A visitor';
  const phone = document.getElementById('cPhone')?.value || '';
  const msg = document.getElementById('cMsg')?.value || '';
  const text = encodeURIComponent(`🌹 Greetings from AustroIndie!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${msg}`);
  window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
}

// ── Shared nav HTML ──
function injectNav(activePage) {
  const pages = [
    { href:'../index.html', label:'Home' },
    { href:'collections.html', label:'Collections' },
    { href:'heritage.html', label:'Heritage' },
    { href:'categories.html', label:'Categories' },
    { href:'contact.html', label:'Contact' },
  ];
  const linksHtml = pages.map(p =>
    `<li><a href="${p.href}" class="${p.label === activePage ? 'active' : ''}">${p.label}</a></li>`
  ).join('');
  const mobileLinksHtml = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  return `
  <nav id="navbar">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">
        <div class="nav-logo-main">
          <svg width="20" height="13" viewBox="0 0 44 28" fill="none" style="opacity:.8"><path d="M2 26L2 10L11 18L22 2L33 18L42 10L42 26Z" stroke="#c9a24e" stroke-width="1.5" fill="none"/><path d="M8 26H36" stroke="#c9a24e" stroke-width="1"/></svg>
          <span class="nav-logo-name">AUSTROINDIE</span>
        </div>
        <span class="nav-logo-sub">Austrian · Indian Collaboration</span>
      </a>
      <ul class="nav-links">${linksHtml}</ul>
      <a href="https://instagram.com/austroindie" target="_blank" class="nav-ig">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.976 1.248 2.243 1.31 3.61.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.425 3.635 1.392 2.668 2.36 2.374 3.532 2.315 4.81 2.257 6.09 2.243 6.498 2.243 12c0 5.502.014 5.91.072 7.19.059 1.278.353 2.45 1.32 3.418.967.967 2.14 1.261 3.418 1.32C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.45-.353 3.418-1.32.967-.968 1.261-2.14 1.32-3.418.058-1.28.072-1.688.072-7.19 0-5.502-.014-5.91-.072-7.19-.059-1.278-.353-2.45-1.32-3.418C19.397.425 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        <span class="nav-ig-text">Instagram</span>
      </a>
      <button class="nav-hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    ${mobileLinksHtml}
    <a href="https://instagram.com/austroindie" target="_blank">@austroindie</a>
  </div>`;
}

// ── Shared footer HTML ──
function injectFooter() {
  return `
  <footer>
    <div class="gold-rule" style="margin-bottom:48px"></div>
    <div class="section-wrap">
      <div class="footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <svg width="18" height="11" viewBox="0 0 44 28" fill="none" style="opacity:.6"><path d="M2 26L2 10L11 18L22 2L33 18L42 10L42 26Z" stroke="#c9a24e" stroke-width="1.5" fill="none"/><path d="M8 26H36" stroke="#c9a24e" stroke-width="1"/></svg>
            <span class="footer-brand-name">AUSTROINDIE</span>
          </div>
          <p class="footer-brand-sub" style="margin-bottom:16px">Austrian · Indian Collaboration</p>
          <p class="footer-text">Where Habsburg precision meets Mughal opulence — curating pieces that transcend borders and carry centuries of craft.</p>
          <div class="footer-socials">
            <a href="https://wa.me/919999999999" target="_blank" class="footer-social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.528 5.84L.057 23.5l5.797-1.499A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.6-.497-5.11-1.367l-.366-.218-3.44.889.921-3.32-.239-.384A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
            <a href="https://instagram.com/austroindie" target="_blank" class="footer-social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.976 1.248 2.243 1.31 3.61.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.425 3.635 1.392 2.668 2.36 2.374 3.532 2.315 4.81 2.257 6.09 2.243 6.498 2.243 12c0 5.502.014 5.91.072 7.19.059 1.278.353 2.45 1.32 3.418.967.967 2.14 1.261 3.418 1.32C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.45-.353 3.418-1.32.967-.968 1.261-2.14 1.32-3.418.058-1.28.072-1.688.072-7.19 0-5.502-.014-5.91-.072-7.19-.059-1.278-.353-2.45-1.32-3.418C19.397.425 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <p class="footer-heading">The Court</p>
          <ul class="footer-links">
            <li><a href="../index.html">Home</a></li>
            <li><a href="collections.html">Collections</a></li>
            <li><a href="categories.html">Categories</a></li>
            <li><a href="heritage.html">Heritage</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-heading">Royal Decree</p>
          <ul class="footer-policies">
            <li>✦ Free Shipping above ₹999</li>
            <li>✦ Cash on Delivery Available</li>
            <li>✦ Easy Returns within 7 days</li>
            <li>✦ Authentic Handcrafted Items</li>
            <li>✦ Mon–Sat: 10am – 7pm</li>
          </ul>
        </div>
      </div>
      <div class="gold-rule" style="margin-bottom:20px"></div>
      <div class="footer-bottom">
        <p>© 2025 AustroIndie. All Rights Reserved.</p>
        <p>Vienna &nbsp;×&nbsp; Jaipur</p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/919999999999?text=Greetings%20from%20AustroIndie!" target="_blank" class="float-wa">
    <svg fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.528 5.84L.057 23.5l5.797-1.499A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.6-.497-5.11-1.367l-.366-.218-3.44.889.921-3.32-.239-.384A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
  </a>`;
}
