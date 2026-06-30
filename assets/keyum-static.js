(function(){
  var links = [
    ['Home','index.html'],
    ['\uB514\uC790\uC774\uB108 \uD0A4\uC6C0 \uC774\uB780?','43.html'],
    ['\uB514\uC790\uC778 \uAE30\uD68D','DesignPlanning.html'],
    ['\uAC8C\uC2DC\uD310 \uC790\uB8CC\uC2E4','44.html'],
    ['\uC81C\uC548 \uBB38\uC758','42.html'],
    ['2022 \uD504\uB85C\uC81D\uD2B8','2022.html'],
    ['2023 \uD504\uB85C\uC81D\uD2B8','2023.html'],
    ['2024 \uD504\uB85C\uC81D\uD2B8','2024.html']
  ];
  function isMobilePath(){ return location.pathname.indexOf('/m/') !== -1; }
  function href(file){ return isMobilePath() ? file : file; }
  function ensureMenu(){
    var existing = document.getElementById('keyum-static-menu');
    if(existing) return existing;
    var overlay = document.createElement('div');
    overlay.id = 'keyum-static-menu';
    overlay.className = 'keyum-static-menu';
    overlay.innerHTML = '<div class="keyum-menu-panel" role="dialog" aria-modal="true" aria-label="Key-Um menu"><button class="keyum-menu-close" type="button" aria-label="\uB2EB\uAE30">&times;</button><strong>Key-Um \uB514\uC790\uC778 \uAD50\uC721 \uC591\uC131\uC18C</strong><nav>'+links.map(function(item){return '<a href="'+href(item[1])+'">'+item[0]+'</a>';}).join('')+'</nav></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e){ if(e.target === overlay || e.target.classList.contains('keyum-menu-close')) closeMenu(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
    return overlay;
  }
  function openMenu(){ ensureMenu().classList.add('is-open'); document.documentElement.classList.add('keyum-menu-open'); }
  function closeMenu(){ var m=document.getElementById('keyum-static-menu'); if(m)m.classList.remove('is-open'); document.documentElement.classList.remove('keyum-menu-open'); }
  document.addEventListener('click', function(e){
    var trigger = e.target.closest('a[onclick*="SLIDE_MENU"], a[onclick*="slideNavToggle"], a._no_hover.fixed_transform, .icon-menu, .bt-bars');
    if(!trigger) return;
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); openMenu();
  }, true);
})();
