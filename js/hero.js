/**
 * hero.js — トップヒーローのスクロール連動アニメ（Phase 1b）
 * Web 1920-1（中央に集合）→ Web 1920-2（端へ開く）をスクロール進捗で補間
 */
(function () {
  "use strict";

  var scrollRoot = document.querySelector("[data-hero-scroll]");
  var hero = document.querySelector("[data-hero]");
  if (!scrollRoot || !hero) return;

  var blobs = scrollRoot.querySelectorAll("[data-blob]");
  var logo = scrollRoot.querySelector("[data-hero-logo]");
  var reveal = scrollRoot.querySelector("[data-hero-reveal]");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /** @type {Record<string, {tx0:number,ty0:number,s0:number,tx1:number,ty1:number,s1:number,rotate:number,speed:number}>} */
  var BLOB_CONFIG_MOBILE = {
    "yellow-top": {
      tx0: 20, ty0: 18, s0: 0.62,
      tx1: 0, ty1: 0, s1: 1,
      rotate: -8, speed: 1,
    },
    "red-left": {
      tx0: 28, ty0: 6, s0: 0.68,
      tx1: 0, ty1: 0, s1: 1,
      rotate: 12, speed: 0.92,
    },
    "red-right": {
      tx0: -26, ty0: 4, s0: 0.68,
      tx1: 0, ty1: 0, s1: 1,
      rotate: -15, speed: 1.08,
    },
    "blue-bottom": {
      tx0: 8, ty0: -22, s0: 0.72,
      tx1: 0, ty1: 0, s1: 1,
      rotate: 4, speed: 0.88,
    },
  };

  var BLOB_CONFIG_DESKTOP = {
    "yellow-top": {
      tx0: 14, ty0: 14, s0: 0.7,
      tx1: 0, ty1: 0, s1: 1,
      rotate: -8, speed: 1,
    },
    "red-left": {
      tx0: 20, ty0: 4, s0: 0.75,
      tx1: 0, ty1: 0, s1: 1,
      rotate: 12, speed: 0.94,
    },
    "red-right": {
      tx0: -18, ty0: 2, s0: 0.75,
      tx1: 0, ty1: 0, s1: 1,
      rotate: -15, speed: 1.06,
    },
    "blue-bottom": {
      tx0: 6, ty0: -16, s0: 0.78,
      tx1: 0, ty1: 0, s1: 1,
      rotate: 4, speed: 0.9,
    },
  };

  var desktopMq = window.matchMedia("(min-width: 768px)");

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function getBlobConfig() {
    return desktopMq.matches ? BLOB_CONFIG_DESKTOP : BLOB_CONFIG_MOBILE;
  }

  function getScrollProgress() {
    var rect = scrollRoot.getBoundingClientRect();
    var scrollable = scrollRoot.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 1;
    var scrolled = Math.max(0, -rect.top);
    return clamp(scrolled / scrollable, 0, 1);
  }

  function applyProgress(rawProgress) {
    var progress = easeOutCubic(rawProgress);
    var configMap = getBlobConfig();

    hero.style.setProperty("--hero-progress", String(progress));

    blobs.forEach(function (el) {
      var key = el.getAttribute("data-blob");
      var cfg = configMap[key];
      if (!cfg) return;

      var t = clamp(progress * cfg.speed, 0, 1);
      var tx = lerp(cfg.tx0, cfg.tx1, t);
      var ty = lerp(cfg.ty0, cfg.ty1, t);
      var scale = lerp(cfg.s0, cfg.s1, t);

      el.style.transform =
        "translate(" + tx + "vw, " + ty + "vh) scale(" + scale + ") rotate(" + cfg.rotate + "deg)";
    });

    if (logo) {
      var logoScale = lerp(1.12, 0.95, progress);
      var logoOpacity = lerp(1, 0.5, progress);
      var logoY = lerp(0, -5, progress);
      logo.style.transform =
        "scale(" + logoScale + ") translateY(" + logoY + "vh)";
      logo.style.opacity = String(logoOpacity);
    }

    if (reveal) {
      var showReveal = progress > 0.45;
      reveal.setAttribute("aria-hidden", showReveal ? "false" : "true");
    }

    hero.dataset.heroState = progress >= 0.98 ? "open" : progress <= 0.02 ? "closed" : "opening";
  }

  function tick() {
    applyProgress(getScrollProgress());
  }

  var rafId = 0;
  function onScrollOrResize() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(function () {
      rafId = 0;
      tick();
    });
  }

  function initReduced() {
    applyProgress(1);
    hero.dataset.heroState = "open";
    document.documentElement.dataset.heroReducedMotion = "true";
  }

  function initAnimated() {
    document.documentElement.dataset.heroReducedMotion = "false";
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    desktopMq.addEventListener("change", onScrollOrResize);
    tick();
  }

  if (reducedMotion.matches) {
    initReduced();
  } else {
    initAnimated();
  }

  reducedMotion.addEventListener("change", function (e) {
    if (e.matches) {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      initReduced();
    } else {
      initAnimated();
    }
  });

  document.documentElement.dataset.jsHero = "ready";
})();
