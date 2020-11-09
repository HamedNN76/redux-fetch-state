import { all, takeEvery } from 'redux-saga/effects';

import { REHYDRATE } from 'redux-persist';
import { watchRehydrate } from "./modules/rehydrate";

import { CHANGE_LANGUAGE, handleChangeLanguage } from './modules/language';

export default function* root(store) {
  yield all([
    takeEvery(REHYDRATE, watchRehydrate, store),
    takeEvery(CHANGE_LANGUAGE, handleChangeLanguage)
  ]);
}
