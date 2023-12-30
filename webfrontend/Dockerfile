# ベースイメージ
FROM node:14-alpine

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションのソースコードをコピー
COPY . /app/

# 依存関係をインストール
RUN npm install

# webpack.config.jsを上書き
COPY webpack.config.js /app/node_modules/react-scripts/config/webpack.config.js

# アプリケーションのビルド
RUN npm run build

# ポートの公開
EXPOSE 3000

# アプリケーションの起動コマンド
CMD ["npm", "start"]