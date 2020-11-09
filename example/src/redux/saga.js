import { all, takeEvery } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist";
import { watchRehydrate } from "./modules/rehydrate";
import { getUsersActionTypes, watchGetUsers } from "./modules/getUsers";

export default function* root() {
  yield all([
    takeEvery(REHYDRATE, watchRehydrate),
    takeEvery(getUsersActionTypes.load, watchGetUsers),
  ]);
}
