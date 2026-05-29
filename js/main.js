/**
 * main.js — 全ページ共通
 * ハンバーガーメニュー・スムーススクロール・アクセシビリティ
 */
(function () {
  "use strict";

  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-site-nav]");
  if (!toggle || !nav) return;

  var navLinks = nav.querySelectorAll(".site-nav__link");
  var labelOpen = toggle.querySelector("[data-menu-label-open]");
  var labelClose = toggle.querySelector("[data-menu-label-close]");
  var lastFocused = null;

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("is-menu-open", open);

    if (open) {
      nav.removeAttribute("hidden");
      lastFocused = document.activeElement;
      var firstLink = nav.querySelector(".site-nav__link");
      if (firstLink) firstLink.focus();
    } else {
      nav.setAttribute("hidden", "");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    if (labelOpen && labelClose) {
      labelOpen.hidden = open;
      labelClose.hidden = !open;
    }
  }

  function closeMenu() {
    if (isOpen()) setOpen(false);
  }

  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* 同一ページ内アンカーのスムーススクロール（CSS scroll-behavior の補完） */
  document.addEventListener("click", function (e) {
    var anchor = e.target.closest("a[href^='#']");
    if (!anchor) return;

    var hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;

    var id = hash.slice(1);
    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.pushState) {
      history.pushState(null, "", "#" + id);
    } else {
      location.hash = id;
    }
  });

  document.documentElement.dataset.jsMain = "ready";
})();
