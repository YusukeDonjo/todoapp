# ToDo リスト

Next.js (App Router) + TypeScript + Tailwind CSS で作られたシンプルなToDo管理アプリです。

## 機能

- タスクの追加
- 完了チェック
- タスクの削除
- ブラウザの `localStorage` にタスクを保存（再読み込みしても消えません）

## 必要な環境

- Node.js 20.9.0 以上（`.nvmrc` に記載。`nvm use` で切り替え可能）

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。`src/components/TodoApp.tsx` を編集すると自動的に反映されます。

## ビルド

```bash
npm run build
npm run start
```

## Vercel へのデプロイ

1. このリポジトリを GitHub 等にプッシュ
2. [Vercel](https://vercel.com/new) でリポジトリをインポート
3. フレームワークは Next.js が自動検出されるため、追加設定は不要です

または Vercel CLI からも直接デプロイできます。

```bash
npx vercel
```
