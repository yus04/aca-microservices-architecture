import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function CountApp() {
  const [n_apple, setApple] = useState(1000);
  const [n_banana, setBanana] = useState(1000);

  useEffect(() => {
    // サーバーに接続
    const socket = io('http://localhost:5000');

    // サーバーからのcountupの通知を受け取る
    socket.on('countup', (fruits_inventory) => {
      let n_apple_in_inventory = fruits_inventory.apple;
      let n_banana__in_inventory = fruits_inventory.banana;
      setApple(n_apple_in_inventory);
      setBanana(n_banana__in_inventory);
    });

    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
        <div>りんごの残り：{ n_apple } 個</div>
        <div>ばななの残り：{ n_banana } 個</div>
    </div>
  );
}

export default CountApp;