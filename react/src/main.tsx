import ReactDOM from 'react-dom'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'
import { brand } from './config/main'

import { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('root')
);

const brandTitle = document.getElementById('brand-title');
if (brandTitle) {
  brandTitle.innerText = brand;
}
