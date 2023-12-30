# 概要

# アーキテクチャ

# 準備事項
dapr のインストール
linux
```
wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
```
windows
```
powershell -Command "iwr -useb https://raw.githubusercontent.com/dapr/cli/master/install/install.ps1 | iex"
```

https://docs.dapr.io/getting-started/install-dapr-cli/

# web (front)
```
npx create-react-app <React アプリ名>
```
で作成したアプリをシンプルにしたものを利用。
https://ja.legacy.reactjs.org/docs/create-a-new-react-app.html

```
cd webfrontend
npm start
```

curl で POST リクエスト
```
curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' http://localhost:8000/dapr/subscribe
```

# web (backend)
アプリとサイドカーの両方をプロセスとして実行
```
cd webbackend
dapr run --app-port 8000 --app-id webbackend --app-protocol http --dapr-http-port 3079 -- node server.js
```

# service
Dockerfileは以下を参考として作成。
https://docs.dapr.io/operations/hosting/self-hosted/self-hosted-with-docker/

Dapr を使用してアプリケーションを実行
```
cd service
dapr run --app-port 8080 --app-id service --app-protocol http --dapr-http-port 3080 -- python app.py
```

curl で POST リクエスト
```
curl -X POST -H "Content-Type: application/json" -H "dapr-app-id: service" -d '{"key1":"value1", "key2":"value2"}' http://localhost:8080/orders
```

# worker1
Dapr を使用してアプリケーションを実行
```
cd workder1
dapr run --app-id worker1 --app-protocol grpc --dapr-grpc-port 3081 -- python app.py
```

# worker2
```
cd workder2
dapr run --app-id worker2 --app-protocol grpc --dapr-grpc-port 3082 -- python app.py
```

# デモ

# デプロイ

# トラブルシューティング
- dapr run の際に redis 関連のエラーが出る → dapr uninstall -all を実行した後、 dapr init を実行して redis を入れなおすと解決。