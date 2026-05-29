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

## ドキュメント

| ファイル | 用途 |
|----------|------|
| [INSTRUCTIONS.md](./INSTRUCTIONS.md) | 制作仕様・フェーズ定義 |
| [PENDING.md](./PENDING.md) | 仮実装 → 本番の差し替えリスト |
| [CLIENT_REVIEW.md](./CLIENT_REVIEW.md) | **クライアント確認用チェックリスト（Phase 6）** |

## 制作フェーズ

詳細は [INSTRUCTIONS.md](./INSTRUCTIONS.md) を参照。

- Phase 0〜5: 実装完了（プロトタイプ）
- **Phase 6**（**現在**）: クライアント確認・XD 合わせ・[PENDING.md](./PENDING.md) の `open` を解消
- Phase 7: 公開・引き渡し（ドメイン / DNS / Gmail 連携）

## 後追い作業（仮 → 本番）

仮実装した箇所は **[PENDING.md](./PENDING.md)** に ID と差し替え手順を追記していく。  
クライアントとの確認は **[CLIENT_REVIEW.md](./CLIENT_REVIEW.md)** に沿って進める。

## microCMS 設定（必須）

`js/news.js` の `CONFIG` にサービス ID と**読み取り専用** API キーを入れる（手順は [PENDING.md](./PENDING.md) の **PND-010**）。

未設定のときは「API 設定が未入力です」と表示される。

## その他未設定（Phase 6 で確定）

- ヒーローブロブ・ロゴ・波形（PND-001〜003）
- Google フォーム URL（PND-006）
- SNS 各アカウント URL（PND-008）
- メニュー周辺ブロブ（PND-009）※象限イラストは PND-014 済
- メンバー写真 / 名簿（PND-011 / PND-012）
- 本番ドメインと OGP 画像 / favicon（PND-013）
