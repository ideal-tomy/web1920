/**
 * news.js — microCMS 連携（一覧・トップ3件・詳細）
 */
(function () {
  "use strict";

  var CONFIG = {
    SERVICE_DOMAIN: "XXXX",
    API_KEY: "XXXXXXXX",
    ENDPOINT: "news",
  };

  var listEl = document.querySelector("[data-news-list]");
  var detailEl = document.querySelector("[data-news-detail]");

  if (!listEl && !detailEl) return;

  function isConfigured() {
    return (
      CONFIG.SERVICE_DOMAIN &&
      CONFIG.SERVICE_DOMAIN !== "XXXX" &&
      CONFIG.API_KEY &&
      CONFIG.API_KEY !== "XXXXXXXX"
    );
  }

  function apiUrl(path, query) {
    var base =
      "https://" +
      CONFIG.SERVICE_DOMAIN +
      ".microcms.io/api/v1/" +
      CONFIG.ENDPOINT +
      path;
    if (!query) return base;
    var params = new URLSearchParams(query);
    return base + "?" + params.toString();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "." + m + "." + day;
  }

  function getDetailHref(id) {
    var base =
      listEl && listEl.getAttribute("data-news-detail-href")
        ? listEl.getAttribute("data-news-detail-href")
        : "news/detail.html";
    var joiner = base.indexOf("?") >= 0 ? "&" : "?";
    return base + joiner + "id=" + encodeURIComponent(id);
  }

  function showMessage(el, message, type) {
    var inner =
      '<p class="news-status news-status--' +
      (type || "error") +
      '" role="status">' +
      escapeHtml(message) +
      "</p>";
    if (el.tagName === "UL") {
      el.innerHTML = '<li class="news-list-message">' + inner + "</li>";
    } else {
      el.innerHTML = inner;
    }
  }

  function fetchNewsList(limit) {
    return fetch(
      apiUrl("", {
        limit: String(limit),
        orders: "-publishedAt",
      }),
      {
        headers: { "X-MICROCMS-API-KEY": CONFIG.API_KEY },
      }
    ).then(function (res) {
      if (!res.ok) throw new Error("API error: " + res.status);
      return res.json();
    });
  }

  function fetchNewsDetail(id) {
    return fetch(apiUrl("/" + encodeURIComponent(id)), {
      headers: { "X-MICROCMS-API-KEY": CONFIG.API_KEY },
    }).then(function (res) {
      if (!res.ok) throw new Error("API error: " + res.status);
      return res.json();
    });
  }

  function buildCard(item) {
    var title = escapeHtml(item.title || "（無題）");
    var date = formatDate(item.publishedAt);
    var datetime = item.publishedAt
      ? String(item.publishedAt).slice(0, 10)
      : "";
    var href = getDetailHref(item.id);
    var thumbUrl =
      item.thumbnail && item.thumbnail.url ? item.thumbnail.url : "";

    var thumbHtml = thumbUrl
      ? '<img class="news-card__thumb-img" src="' +
        escapeHtml(thumbUrl) +
        '" alt="" loading="lazy" width="400" height="250">'
      : '<div class="news-card__thumb news-card__thumb--empty" aria-hidden="true"></div>';

    return (
      '<li class="news-card">' +
      '<a href="' +
      escapeHtml(href) +
      '" class="news-card__link">' +
      '<div class="news-card__thumb-wrap">' +
      thumbHtml +
      "</div>" +
      '<div class="news-card__body">' +
      (date
        ? '<time class="news-card__date" datetime="' +
          escapeHtml(datetime) +
          '">' +
          escapeHtml(date) +
          "</time>"
        : "") +
      '<h3 class="news-card__title">' +
      title +
      "</h3>" +
      '<span class="news-card__more">続きを読む</span>' +
      "</div>" +
      "</a>" +
      "</li>"
    );
  }

  function renderList(container, items) {
    if (!items.length) {
      showMessage(container, "お知らせはまだありません。", "empty");
      return;
    }
    container.innerHTML = items.map(buildCard).join("");
  }

  function initList() {
    var limit = parseInt(listEl.getAttribute("data-news-limit") || "10", 10);
    if (!isConfigured()) {
      showMessage(
        listEl,
        "microCMS の API 設定が未入力です。js/news.js の SERVICE_DOMAIN と API_KEY を設定してください。（PND-010）",
        "config"
      );
      return;
    }

    showMessage(listEl, "お知らせを読み込んでいます…", "loading");

    fetchNewsList(limit)
      .then(function (data) {
        renderList(listEl, data.contents || []);
      })
      .catch(function () {
        showMessage(listEl, "お知らせを読み込めませんでした。", "error");
      });
  }

  function getQueryId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function renderDetail(item) {
    var title = escapeHtml(item.title || "（無題）");
    var date = formatDate(item.publishedAt);
    var datetime = item.publishedAt
      ? String(item.publishedAt).slice(0, 10)
      : "";
    var thumbUrl =
      item.thumbnail && item.thumbnail.url ? item.thumbnail.url : "";

    var html = '<header class="news-detail__header">';
    if (date) {
      html +=
        '<time class="news-detail__date" datetime="' +
        escapeHtml(datetime) +
        '">' +
        escapeHtml(date) +
        "</time>";
    }
    html += "<h1 class=\"news-detail__title\">" + title + "</h1>";
    html += "</header>";

    if (thumbUrl) {
      html +=
        '<figure class="news-detail__figure"><img src="' +
        escapeHtml(thumbUrl) +
        '" alt="" class="news-detail__thumb" loading="lazy"></figure>';
    }

    html +=
      '<div class="news-detail__body cms-body">' +
      (item.body || "") +
      "</div>";

    detailEl.innerHTML = html;
    document.title = (item.title || "News 詳細") + " | カラクリ";
  }

  function initDetail() {
    var id = getQueryId();
    if (!id) {
      showMessage(detailEl, "記事が指定されていません。", "error");
      return;
    }

    if (!isConfigured()) {
      showMessage(
        detailEl,
        "microCMS の API 設定が未入力です。js/news.js の SERVICE_DOMAIN と API_KEY を設定してください。（PND-010）",
        "config"
      );
      return;
    }

    showMessage(detailEl, "記事を読み込んでいます…", "loading");

    fetchNewsDetail(id)
      .then(function (item) {
        renderDetail(item);
      })
      .catch(function () {
        showMessage(detailEl, "記事を読み込めませんでした。", "error");
      });
  }

  if (listEl) initList();
  if (detailEl) initDetail();

  document.documentElement.dataset.jsNews = "ready";
})();
