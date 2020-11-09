import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

let store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
let persistor = persistStore(store);

store.rootTask = sagaMiddleware.run(saga, store);

export {
  store,
  persistor
};
