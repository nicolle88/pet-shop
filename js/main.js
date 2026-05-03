/* ============================================================
   PetCare — js/main.js
   Injeta header e footer. Alterar somente via Pull Request.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  highlightActiveNav();
  updateCartBadge();
  createToastEl();
});

/* ── HEADER ── */
function injectHeader() {
  const header = document.createElement('header');
  header.id = 'site-header';
  header.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo-icon">🐾</div>
        <span>PetCare</span>
      </a>
      <nav class="main-nav">
        <a href="index.html">Início</a>
        <a href="produtos.html">Produtos</a>
        <a href="servicos.html">Serviços</a>
        <a href="sobre.html">Sobre</a>
        <a href="contato.html">Contato</a>
      </nav>
      <div class="header-actions">
        <div class="cart-icon" onclick="location.href='carrinho.html'" title="Carrinho">
          🛒
          <span class="cart-badge" id="cart-badge" style="display:none;">0</span>
        </div>
        <button class="btn outline sm" onclick="location.href='login.html'">Entrar</button>
        <button class="btn green sm" onclick="location.href='agendamento.html'">📅 Agendar</button>
      </div>
    </div>
  `;
  document.body.prepend(header);
}

/* ── FOOTER ── */
function injectFooter() {
  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="color:#fff;"><div class="logo-icon">🐾</div><span>PetCare</span></div>
          <p>Cuidamos do seu melhor amigo com carinho e profissionalismo desde 2015.</p>
        </div>
        <div class="footer-col">
          <h4>Serviços</h4>
          <a href="servicos.html">Banho e Tosa</a>
          <a href="servicos.html">Consulta Veterinária</a>
          <a href="servicos.html">Hotel para Pets</a>
          <a href="servicos.html">Vacinação</a>
        </div>
        <div class="footer-col">
          <h4>Links</h4>
          <a href="index.html">Início</a>
          <a href="produtos.html">Produtos</a>
          <a href="agendamento.html">Agendamento</a>
          <a href="sobre.html">Sobre Nós</a>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <a href="contato.html">Fale Conosco</a>
          <a href="mailto:contato@petcare.com.br">contato@petcare.com.br</a>
          <a href="tel:+551199999999">(11) 9 9999-9999</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} PetCare. Todos os direitos reservados.</span>
        <span>Feito com 🐾 para amantes de pets</span>
      </div>
    </div>
  `;
  document.body.append(footer);
}

/* ── NAV ATIVO ── */
function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-header .main-nav a').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

/* ── BADGE CARRINHO ── */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const carrinho = Storage ? Storage.getList('petcare_carrinho') : [];
  const total = carrinho.reduce((s, i) => s + (i.qtd || 1), 0);
  if (total > 0) { badge.textContent = total; badge.style.display = 'flex'; }
  else badge.style.display = 'none';
}

/* ── TOAST ── */
function createToastEl() {
  if (document.getElementById('toast-el')) return;
  const el = document.createElement('div');
  el.id = 'toast-el';
  el.className = 'toast';
  document.body.append(el);
}

function mostrarToast(msg, tipo = 'info') {
  const el = document.getElementById('toast-el');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${tipo}`;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}
