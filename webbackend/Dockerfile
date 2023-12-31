# ベースイメージ
FROM node:14-alpine

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションのソースコードをコピー
COPY . /app/

# 依存関係をインストール
RUN npm install

# ポートの公開
EXPOSE 5000

# expressサーバーの起動コマンド
CMD ["npm", "start"]