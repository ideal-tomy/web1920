# 後追い作業リスト（PENDING）

仮実装のまま進めた箇所を、**本番素材・確定値へ差し替える作業**をここに追記していく。

---

## 運用ルール

1. **仮で進めるとき**は、コードに `data-placeholder` 属性（または HTML コメント `<!-- PENDING:PND-xxx -->`）を付ける。
2. **同時にこのファイルへ 1 件追記**する（下記テンプレート）。ID は `PND-001` から連番。
3. **差し替え完了したら**、該当項目のステータスを `done` にし、完了日を記入。コードから `data-placeholder` を外す。
4. 手順は「誰が見ても再現できる」粒度で書く（ファイルパス・検索キーワード・確認方法を含める）。
5. 新しい仮実装をするたびに **一覧表と詳細の両方**を更新する（一覧だけにしない）。

### 追記テンプレート（コピーして使う）

```markdown
### PND-0XX: （タイトル）

| 項目 | 内容 |
|------|------|
| ステータス | `open` / `done` |
| 追加日 | YYYY-MM-DD |
| 完了日 | （done 時のみ） |
| 仮の内容 | （例: CSS 四角ブロブ） |
| 本番の内容 | （例: XD 書き出し SVG） |
| 関連ファイル | `path/to/file` |

#### 差し替え手順

1. …
2. …

#### 確認方法

- …
```

### 一覧（サマリー）

| ID | ステータス | 概要 | 関連 |
|----|------------|------|------|
| PND-001 | open | ヒーローブロブ（CSS 仮）→ XD SVG | `index.html`, `css/style.css` |
| PND-002 | open | ヒーローロゴ（CSS 仮）→ XD 書き出し | `index.html`, `css/style.css` |
| PND-003 | open | セクション波形（CSS 仮）→ XD 書き出し | `index.html`, `css/style.css` |
| PND-004 | done | SNS アイコン（文字仮）→ 画像適用済み | `index.html`, `css/style.css`, `images/icons/` |
| PND-005 | done | News ダミーカード → microCMS 描画（コード接続済） | `index.html`, `js/news.js` |
| PND-010 | open | microCMS API 設定（`XXXX` 仮のまま） | `js/news.js` |
| PND-006 | open | Contact ボタン URL 仮 → Google フォーム | `index.html` |
| PND-007 | open | 文案・ダミーテキスト → クライアント原稿 | `index.html` |
| PND-008 | open | SNS リンク URL 仮（`#`）→ 実アカウント | `index.html` |
| PND-009 | open | メニュー装飾星（CSS 仮）→ XD 書き出し | 全 HTML の `.site-nav__decor` |
| PND-011 | open | メンバー写真（`demo.jpg` 仮）→ 本番写真へ差し替え | `member/index.html`, `member/honda.html`, `images/member/demo.jpg` |
| PND-012 | open | メンバー名簿・肩書・本文仮 → 確定原稿 | `member/index.html`, `member/honda.html` |
| PND-013 | open | OGP URL / OGP画像 / favicon 仮 → 本番ドメイン反映 | 全 HTML head, `images/ogp.png`, `images/favicon.png` |

---

## 記録（詳細手順）

### PND-001: ヒーローブロブ（CSS 仮四角 → XD 個別 SVG）

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `.hero__blob` の単色 `border-radius` 付き四角（赤・黄・青） |
| 本番の内容 | `images/hero/` にブロブごとの SVG（または PNG） |
| 関連ファイル | `index.html`（`[data-blob]`）, `css/style.css`（`.hero__blob`）, `images/hero/README.md` |

#### 差し替え手順

1. XD から Web 1920-1 状態のブロブを **1 オブジェクト = 1 ファイル** で書き出し、`images/hero/` に配置（例: `blob-red-left.svg`）。
2. `index.html` のヒーロー内で、該当する `<div class="hero__blob" data-blob="…" data-placeholder>` を次のいずれかに変更:
   - `<img src="images/hero/blob-red-left.svg" alt="" data-blob="red-left">`
   - または背景: `class="hero__blob hero__blob--img"` + CSS で `background-image`
3. `css/style.css` の `.hero__blob--red-left` 等の **背景色・width/height の仮スタイル**を削除または上書きし、画像サイズ・位置を XD（Web 1920-2 終了位置）に合わせて調整。
4. 各要素の `data-placeholder` を削除。
5. Phase 1b の `hero.js` 内 `BLOB_CONFIG_MOBILE` / `BLOB_CONFIG_DESKTOP` の `tx0` `ty0` `s0` 等を、実画像のサイズ・形に合わせて再調整（`js/hero.js` を検索）。

#### 確認方法

- トップを開き、ブロブが XD の形になっていること。
- スクロール時（Phase 1b 後）に個別に動くこと。

---

### PND-002: ヒーローロゴ（CSS 2×2 仮 → XD 書き出し）

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `.hero__logo-grid` の 4 色 DIV |
| 本番の内容 | `images/hero/logo.svg`（または PNG） |
| 関連ファイル | `index.html`, `css/style.css` |

#### 差し替え手順

1. XD からロゴを `images/hero/logo.svg` に書き出す。
2. `index.html` の `.hero__logo-grid` ブロックを `<img class="hero__logo-img" src="images/hero/logo.svg" alt="カラクリ" width="…" height="…">` に置換。
3. `.hero__logo-grid` / `.hero__logo-cell` の CSS を削除またはコメントアウト。
4. `data-placeholder` を削除。

#### 確認方法

- ヒーロー中央のロゴが XD と一致していること。

---

### PND-003: セクション波形（CSS 仮 → XD 書き出し）

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `.section-wave` の `border-radius` による簡易カーブ |
| 本番の内容 | `images/waves/` の SVG（News 青 / Member 黄 / SNS 赤 など） |
| 関連ファイル | `index.html`, `css/style.css` |

#### 差し替え手順

1. XD から各セクション境界の波形のみ書き出し、`images/waves/` に保存。
2. 該当 `.section-wave[data-placeholder]` を `<img>` または `background-image` に差し替え。
3. 仮の `border-radius` スタイルを削除。セクションの `padding-top` を画像高さに合わせて調整。
4. `data-placeholder` を削除。

#### 確認方法

- News / Member / SNS の上下境界が XD と一致していること（SP・PC）。

---

### PND-004: SNS アイコン（文字仮 → 画像）

| 項目 | 内容 |
|------|------|
| ステータス | `done` |
| 追加日 | 2026-05-29 |
| 完了日 | 2026-05-29 |
| 仮の内容 | SNS 頭文字（IG / TT / FB）表示 |
| 本番の内容 | `images/icons/icon-instagram.png` などの画像表示 |
| 関連ファイル | `index.html`, `css/style.css`, `images/icons/` |

#### 差し替え手順

（完了）アイコン画像の配置と `<img>` 置換を実施済み。SNS URL は `PND-008` で対応。

#### 確認方法

- 画像アイコンが表示され、タップ領域が十分あること。

---

### PND-005: News ダミーカード → microCMS 描画

| 項目 | 内容 |
|------|------|
| ステータス | `done` |
| 追加日 | 2026-05-29 |
| 完了日 | 2026-05-29 |
| 仮の内容 | `#news-list` 内の静的 HTML 3 件 |
| 本番の内容 | `js/news.js` による fetch 描画 |
| 関連ファイル | `index.html`, `js/news.js`, `news/index.html`, `news/detail.html` |

#### 差し替え手順

（Phase 3 で完了。API キー設定は **PND-010**。）

#### 確認方法

- PND-010 設定後、microCMS で記事追加しトップに 3 件・一覧に反映されること。

---

### PND-010: microCMS API 設定

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `SERVICE_DOMAIN: "XXXX"` / `API_KEY: "XXXXXXXX"` |
| 本番の内容 | クライアント microCMS のサービス ID と読み取り専用 API キー |
| 関連ファイル | `js/news.js` |

#### 差し替え手順

1. microCMS 管理画面で API 設定を開く。
2. **読み取り専用** API キーを発行（書き込み権限は付けない）。
3. `js/news.js` の `CONFIG` を更新:
   ```js
   SERVICE_DOMAIN: "あなたのサービスID",
   API_KEY: "読み取り専用キー",
   ```
4. 可能なら microCMS 側で参照元ドメイン制限をかける。
5. microCMS で `news` API に `title` / `thumbnail` / `body` / `publishedAt` フィールドがあることを確認。

#### 確認方法

- トップ News に最新 3 件が表示される。
- `news/index.html` に一覧（最大 10 件）が表示される。
- カードから `news/detail.html?id=xxx` で本文が表示される。

---

### PND-006: Contact ボタン URL 仮 → Google フォーム

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `href="#"` のプレースホルダ |
| 本番の内容 | クライアント Gmail で作成したフォーム URL |
| 関連ファイル | `index.html` |

#### 差し替え手順

1. Google フォームの共有 URL を取得。
2. `#contact` 内 `.btn-contact` の `href` を差し替え。`target="_blank"` `rel="noopener noreferrer"` を維持。
3. `data-placeholder` を削除。

#### 確認方法

- ボタンからフォームが別タブで開くこと。

---

### PND-007: 文案・ダミーテキスト → クライアント原稿

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | About / Member 等の仮日本語 |
| 本番の内容 | クライアント確定コピー |
| 関連ファイル | `index.html` |

#### 差し替え手順

1. XD または原稿ドキュメントのテキストで `index.html` 内の該当段落を置換。
2. `meta description` も必要に応じて更新。

#### 確認方法

- 誤字・行数が XD の想定と合っていること。

---

### PND-009: メニュー装飾星（CSS 仮 → XD 書き出し）

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `.site-nav__star` の CSS `clip-path` 星形（赤・黄・青） |
| 本番の内容 | XD メニュー画面の星型アイコン SVG（4 つ） |
| 関連ファイル | 全ページの `nav.site-nav` 内 `.site-nav__decor` |

#### 差し替え手順

1. XD のメニュー（押下先）から星アイコンを `images/icons/menu-star-*.svg` 等で書き出す。
2. 各 `<li class="site-nav__star">` を `<li><img src="…" alt="" width="48" height="48"></li>` に置換（装飾なので `alt=""`）。
3. `.site-nav__star--*` の背景色・`clip-path` 用 CSS を削除。
4. `data-placeholder="PND-009"` を親 `ul` から削除。

#### 確認方法

- メニューを開き、XD の MENU 画面と星の見た目が一致すること。

---

### PND-008: SNS リンク URL 仮 → 実アカウント

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | `.sns-link` の `href="#"` |
| 本番の内容 | Instagram / TikTok / Facebook の各 URL |
| 関連ファイル | `index.html` |

#### 差し替え手順

1. クライアントから各 SNS の URL を受け取る。
2. `#sns` 内の 3 つの `.sns-link` の `href` を差し替える（`target="_blank"` `rel="noopener noreferrer"` は維持）。
3. `aria-label` から「URL未設定」を削除。
4. `data-placeholder="PND-004"` はアイコン差し替え（PND-004）と別。URL のみなら `data-placeholder` を外すか、PND-004 完了時にまとめて削除。

#### 確認方法

- 各リンクが正しい SNS ページを開くこと。

---

### PND-011: メンバー写真ファイル仮 → 本番写真

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | 全メンバーで `images/member/demo.jpg` を共通表示 |
| 本番の内容 | メンバーごとの本番写真（例: `member-honda.jpg` 等）を配置して表示 |
| 関連ファイル | `member/index.html`, `member/honda.html`, `images/member/` |

#### 差し替え手順

1. `images/member/` にメンバーごとの本番写真を配置（例: `member-honda.jpg`）。
2. 各 `<img src="../images/member/demo.jpg">` を個別ファイル名へ変更し、`alt` を実名に合わせる。
3. 画像配置後、`data-placeholder="PND-011"` を削除。
4. 必要なら `width` / `height` を写真比率に合わせて調整。

#### 確認方法

- メンバー一覧と個人ページで写真が表示されること。
- 画像が縦横比を崩さずトリミングされること。

---

### PND-012: メンバー名簿・肩書・本文仮 → 確定原稿

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | 本田晴喜・山田花子などのダミー名と仮メッセージ |
| 本番の内容 | XD / クライアント確定の名前・肩書・カテゴリ・本文 |
| 関連ファイル | `member/index.html`, `member/honda.html` |

#### 差し替え手順

1. 役割カテゴリ（代表 / 広報 / 企画 等）を XD に合わせて更新。
2. 各メンバーの名前・肩書を確定値へ置換。
3. 個人ページ本文と Profile の項目を確定原稿へ更新。
4. 更新後、`data-placeholder="PND-012"` を削除。

#### 確認方法

- 表記ゆれ・誤字がないこと。
- `member/index.html` のリンク先と個人ページの内容が一致すること。

---

### PND-013: OGP URL / OGP画像 / favicon 仮 → 本番反映

| 項目 | 内容 |
|------|------|
| ステータス | `open` |
| 追加日 | 2026-05-29 |
| 完了日 | — |
| 仮の内容 | OGP `https://example.com`、`images/ogp.png` と `images/favicon.png` は仮画像 |
| 本番の内容 | 本番ドメイン URL と正式 OGP画像・favicon に差し替え |
| 関連ファイル | `index.html`, `news/index.html`, `news/detail.html`, `member/index.html`, `member/honda.html`, `images/ogp.png`, `images/favicon.png` |

#### 差し替え手順

1. 公開ドメイン確定後、全ページの `og:url` / `og:image` / `twitter:image` を本番URLに更新。
2. 正式な OGP 画像（推奨 1200x630）を `images/ogp.png` に配置。
3. 正式な favicon を `images/favicon.png` に配置。
4. 反映後、SNS デバッガ（X / Facebook）でキャッシュ更新を実行。

#### 確認方法

- 各ページの `<head>` で URL と画像が本番値になっていること。
- OGP プレビューでタイトル・説明・画像が想定どおり表示されること。

---
