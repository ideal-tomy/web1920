# カラクリ 公式サイト

学生団体「カラクリ」の静的公式サイト（HTML / CSS / Vanilla JS）。

## ローカルでの開き方

1. このフォルダの `index.html` をブラウザで開く（ダブルクリックまたは Live Server 等）。
2. ビルド・`npm install` は不要。

## ディレクトリ

| パス | 内容 |
|------|------|
| `index.html` | トップ LP |
| `news/` | お知らせ一覧・詳細 |
| `member/` | メンバー一覧・個人ページ |
| `css/style.css` | スタイル一式 |
| `js/` | `main.js` / `hero.js` / `news.js` |
| `images/` | XD 書き出し素材 |

## 制作フェーズ

詳細は [INSTRUCTIONS.md](./INSTRUCTIONS.md) を参照。

- Phase 0: 土台
- Phase 1: トップ静的レイアウト（仮ブロブ含む）
- Phase 1b: ヒーロースクロールアニメ
- Phase 2: ハンバーガーメニュー・全ページ共通ヘッダー/フッター
- Phase 3: microCMS 連携（コード済み。**API 設定は PND-010**）
- Phase 4: Member 一覧・個人ページテンプレート実装
- **Phase 5**（現在）: レスポンシブ最終調整・メタ/OGP・README整備

## 後追い作業（仮 → 本番）

仮実装した箇所は **[PENDING.md](./PENDING.md)** に ID と差し替え手順を追記していく。

## microCMS 設定（必須）

`js/news.js` の `CONFIG` にサービス ID と**読み取り専用** API キーを入れる（手順は [PENDING.md](./PENDING.md) の **PND-010**）。

未設定のときは「API 設定が未入力です」と表示される。

## その他未設定

- Google フォーム URL → Contact ボタン（PND-006）
- SNS 各アカウント URL（PND-008）
- メンバー写真 / 名簿確定（PND-011 / PND-012）
- 本番ドメインと OGP 画像 / favicon（PND-013）
