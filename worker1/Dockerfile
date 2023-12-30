# ベースイメージ
FROM python:3.10.6-alpine

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションのコードをコピー
COPY app.py /app/

# アプリケーションの依存関係をインストール
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Daprサイドカーコンテナを起動してからアプリケーションを実行
CMD ["python", "app.py"]
