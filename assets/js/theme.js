/* Wire up the theme toggle and keep the address-bar colour in sync.
   The initial theme is already applied pre-paint by the head script
   (see _includes/theme-head.html), so this only handles user interaction. */
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var btn = document.getElementById('theme-toggle');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d1117' : '#ffffff');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      document.cookie = 'theme=' + next + ';path=/;max-age=31536000;samesite=lax';
    });
  }

  /* Sync aria-pressed and meta to the pre-paint theme (no cookie written). */
  apply(root.getAttribute('data-theme') || 'light');

  /* Follow OS theme changes only while the user hasn't chosen explicitly. */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSchemeChange = function (e) {
      if (!/(?:^|;\s*)theme=(dark|light)/.test(document.cookie)) {
        apply(e.matches ? 'dark' : 'light');
      }
    };
    if (mq.addEventListener) { mq.addEventListener('change', onSchemeChange); }
    else if (mq.addListener) { mq.addListener(onSchemeChange); }
  }
})();
