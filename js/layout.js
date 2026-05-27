/* DES Global — layout.js v6 */
(function () {

  const HEADER = `
<header>
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <img src="images/logo.png" alt="DES Logo" style="height:48px;width:auto;flex-shrink:0;">
        <div>
          <div class="logo-name" style="font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;font-weight:800;letter-spacing:-0.01em;">Dynamic Energy Systems</div>
          <span class="logo-tag" style="font-family:'Plus Jakarta Sans',sans-serif;font-size:0.6rem;color:var(--text2);letter-spacing:0.06em;text-transform:none;display:block;font-style:italic;">"We're more than systems, we're solutions!"</span>
        </div>
      </a>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="leadership.html">Leadership</a></li>
          <li class="has-dropdown">
            <a href="services.html">Services <span class="nav-caret">&#9662;</span></a>
            <div class="nav-dropdown">
              <div class="nav-dropdown-inner">
                <div class="nav-dropdown-col">
                  <div class="nav-dropdown-label">Core Products</div>
                  <a href="emrs.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">EMRS Platform</span>
                    <span class="nav-dropdown-sub">Energy Management &amp; Reporting System</span>
                  </a>
                  <a href="optimaxx.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">OptiMaxx</span>
                    <span class="nav-dropdown-sub">Real-Time Pricing Demand Response</span>
                  </a>
                  <a href="multimaxx.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">MultiMaxx</span>
                    <span class="nav-dropdown-sub">Multi-Fuel Boiler Control</span>
                  </a>
                </div>
                <div class="nav-dropdown-col">
                  <div class="nav-dropdown-label">More Services</div>
                  <a href="combustion.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Combustion Optimization</span>
                    <span class="nav-dropdown-sub">Thermal efficiency &amp; compliance</span>
                  </a>
                  <a href="variability.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Variability Management</span>
                    <span class="nav-dropdown-sub">Eliminate the hidden cost</span>
                  </a>
                  <a href="audit.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Free Engineering Audit</span>
                    <span class="nav-dropdown-sub">Quantify your opportunity first</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li><a href="markets.html">Markets</a></li>
          <li><a href="success-stories.html">Results</a></li>
          <li><a href="presentations.html">Presentations</a></li>
          <li><a href="news.html">News</a></li>
          <li><a href="careers.html">Careers</a></li>
        </ul>
      </nav>
      <div class="nav-right">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="icon-moon">&#127769;</span>
          <span class="icon-sun">&#9728;&#65039;</span>
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">Free Evaluation</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobileNav">
  <button class="mobile-close" id="mobileClose">&#10005;</button>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="leadership.html">Leadership</a>
  <div class="mobile-nav-group-label">Services</div>
  <a href="services.html" class="mobile-nav-sub">All Services</a>
  <a href="emrs.html" class="mobile-nav-sub">EMRS Platform</a>
  <a href="optimaxx.html" class="mobile-nav-sub">OptiMaxx</a>
  <a href="multimaxx.html" class="mobile-nav-sub">MultiMaxx</a>
  <a href="combustion.html" class="mobile-nav-sub">Combustion Optimization</a>
  <a href="variability.html" class="mobile-nav-sub">Variability Management</a>
  <a href="audit.html" class="mobile-nav-sub">Free Engineering Audit</a>
  <a href="markets.html">Markets</a>
  <a href="success-stories.html">Results</a>
  <a href="presentations.html">Presentations</a>
  <a href="news.html">News</a>
  <a href="careers.html">Careers</a>
  <a href="contact.html" style="margin-top:0.5rem;background:var(--accent);color:#fff !important;border-radius:8px;font-weight:700;text-align:center;padding:0.75rem 1.5rem;">Free Evaluation →</a>
  <button id="mobileThemeToggle" style="background:none;border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:0.88rem;padding:0.55rem 1.5rem;text-align:left;color:var(--text2);margin-top:0.5rem;width:calc(100% - 3rem);display:flex;align-items:center;gap:0.5rem;"><span class="icon-moon">&#127769;</span><span class="icon-sun">&#9728;&#65039;</span><span>&nbsp;Toggle Dark / Light Mode</span></button>
</div>`;

  const FOOTER = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo" style="gap:0.75rem;">
          <img src="images/logo.png" alt="DES Logo" style="height:44px;width:auto;flex-shrink:0;">
          <div>
            <div class="logo-name" style="font-family:'Playfair Display',Georgia,serif;font-size:1.1rem;font-weight:800;">Dynamic Energy Systems</div>
            <span style="font-family:'Plus Jakarta Sans',sans-serif;font-size:0.58rem;color:var(--text3);letter-spacing:0.04em;font-style:italic;display:block;">"We're more than systems, we're solutions!"</span>
          </div>
        </a>
        <p>Dynamic Energy Systems develops patented process control solutions that automatically drive industrial facilities to economic optimum — closing the loop on today's most complex energy and production challenges.</p>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="leadership.html">Leadership</a></li>
          <li><a href="presentations.html">Presentations</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="news.html">News</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="emrs.html">EMRS Platform</a></li>
          <li><a href="optimaxx.html">OptiMaxx</a></li>
          <li><a href="multimaxx.html">MultiMaxx</a></li>
          <li><a href="combustion.html">Combustion Optimization</a></li>
          <li><a href="variability.html">Variability Management</a></li>
          <li><a href="audit.html">Free Engineering Audit</a></li>
          <li><a href="success-stories.html">Documented Results</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:info@desglobal.com">info@desglobal.com</a></li>
          <li><a href="tel:8643069878">864.306.9878</a></li>
          <li style="color:var(--text2);font-size:0.88rem;line-height:1.5">1708 Augusta St<br>Greenville, SC 29605</li>
          <li><a href="markets.html">Industries Served</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&#169; 2025 Dynamic Energy Systems LLC. All rights reserved.</p>
      <div class="footer-socials">
        <a href="https://www.linkedin.com/company/dynamic-energy-systems" target="_blank" rel="noopener" class="fsoc" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="mailto:info@desglobal.com" class="fsoc" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>`;

  const hTarget = document.getElementById('site-header');
  if (hTarget) hTarget.outerHTML = HEADER;
  const fTarget = document.getElementById('site-footer');
  if (fTarget) fTarget.outerHTML = FOOTER;

})();
