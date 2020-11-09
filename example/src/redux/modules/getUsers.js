import ReduxFetchState from "redux-fetch-state";
import { put } from "redux-saga/effects";

const { actions, actionTypes, reducer } = new ReduxFetchState("getUsers");

export function* watchGetUsers() {
  try {
    const res = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield res.json();
    yield put(actions.loadSuccess(data));
  } catch (e) {
    yield put(actions.loadFailure(e));
  }
}

export {
  reducer as getUsers,
  actions as getUsersActions,
  actionTypes as getUsersActionTypes,
};
