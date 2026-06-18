/* Wire up the theme toggle and keep the address-bar colour in sync.
   The initial theme is already applied pre-paint by the head script
   (see _includes/theme-head.html), so this only handles user interaction. */
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d1117' : '#ffffff');
  }

  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      document.cookie = 'theme=' + next + ';path=/;max-age=31536000;samesite=lax';
    });
  }

  /* Follow OS theme changes only while the user hasn't chosen explicitly. */
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!/(?:^|;\s*)theme=(dark|light)/.test(document.cookie)) {
        apply(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
