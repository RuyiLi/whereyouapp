import { render } from 'solid-js/web';

import './index.d'; // ??????????
import './index.css';
import 'leaflet/dist/leaflet.css';
import { App } from './App';

render(() => <App />, document.getElementById('root')!);
