import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from './redux/store';
import { AppLoading } from "./components/kit";
import { I18nextProvider } from 'react-i18next';
import { i18n } from './localization';
import App from './App';

ReactDOM.hydrate(
  <Provider store={store}>
    <PersistGate loading={<AppLoading />} persistor={persistor}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
