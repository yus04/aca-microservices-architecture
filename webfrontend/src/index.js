import ReactDOM from 'react-dom/client';
import CountApp from './CountApp.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () => {
  root.render(
    <>
      <CountApp />
    </>
  );
};

render();

