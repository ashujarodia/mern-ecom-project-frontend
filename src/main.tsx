import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/color.css';
import './styles/font.css';
import './styles/index.css';
import './styles/tailwind.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
