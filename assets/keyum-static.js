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

  function toArray(list){ return Array.prototype.slice.call(list || []); }
  function itemWidth(item, root){
    if(!item) return root.getBoundingClientRect().width || window.innerWidth || 1;
    var inline = parseFloat(item.style.width || '');
    if(inline > 0) return inline;
    var rect = item.getBoundingClientRect();
    if(rect.width > 0) return rect.width;
    return root.getBoundingClientRect().width || window.innerWidth || 1;
  }
  function initOwlCarousel(root){
    if(!root || root.dataset.keyumCarousel === 'ready') return;
    var stage = root.querySelector('.owl-stage');
    var items = toArray(root.querySelectorAll('.owl-item'));
    if(!stage || items.length < 2) return;
    var realIndexes = [];
    items.forEach(function(item, index){ if(!item.classList.contains('cloned')) realIndexes.push(index); });
    if(!realIndexes.length) realIndexes = items.map(function(_, index){ return index; });
    var activeIndex = items.findIndex(function(item){ return item.classList.contains('active') && !item.classList.contains('cloned'); });
    if(activeIndex < 0) activeIndex = items.findIndex(function(item){ return item.classList.contains('active'); });
    var position = Math.max(0, realIndexes.indexOf(activeIndex >= 0 ? activeIndex : realIndexes[0]));
    var dots = toArray(root.querySelectorAll('.owl-dot'));
    var thumbs = toArray(root.querySelectorAll('.owl-thumb-item'));

    function sync(nextPosition, animate){
      position = (nextPosition + realIndexes.length) % realIndexes.length;
      var itemIndex = realIndexes[position];
      var width = itemWidth(items[itemIndex], root);
      items.forEach(function(item){ item.classList.remove('active', 'center', 'current'); });
      items[itemIndex].classList.add('active', 'current');
      stage.style.transition = animate === false ? 'none' : 'transform 260ms ease';
      stage.style.transform = 'translate3d(' + (-itemIndex * width) + 'px, 0px, 0px)';
      dots.forEach(function(dot, index){ dot.classList.toggle('active', index === position); });
      thumbs.forEach(function(thumb, index){ thumb.classList.toggle('current', index === position); thumb.classList.toggle('active', index === position); });
      root.setAttribute('data-keyum-slide-index', String(position));
    }
    function handle(delta){
      return function(event){
        event.preventDefault();
        event.stopPropagation();
        if(event.stopImmediatePropagation) event.stopImmediatePropagation();
        sync(position + delta, true);
      };
    }
    var prev = root.querySelector('.owl-prev');
    var next = root.querySelector('.owl-next');
    if(prev) prev.addEventListener('click', handle(-1), true);
    if(next) next.addEventListener('click', handle(1), true);
    dots.forEach(function(dot, index){
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(event.stopImmediatePropagation) event.stopImmediatePropagation();
        sync(index, true);
      }, true);
      dot.addEventListener('keydown', function(event){ if(event.key === 'Enter' || event.key === ' ') sync(index, true); });
    });
    root.dataset.keyumCarousel = 'ready';
    sync(position, false);
    window.addEventListener('resize', function(){ sync(position, false); });
  }
  function initCarousels(){ toArray(document.querySelectorAll('.owl-carousel')).forEach(initOwlCarousel); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCarousels);
  else initCarousels();
})();
