import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.js';

import './index.scss';
import 'macro-css';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);

