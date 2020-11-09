import { handleLanguageOnAppStart } from "./language";

export function* watchRehydrate(store) {
  yield handleLanguageOnAppStart(store);
}
