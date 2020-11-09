import { i18n, languages } from "../../localization";

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  language
});

const initialState = languages.persian;

export default function reducer(state = initialState, action) {
  if (action.type === CHANGE_LANGUAGE) {
    return action.language;
  } else {
    return state;
  }
};

export function* handleLanguageOnAppStart(store) {
  const language = yield store.getState().language;
  yield setPageDirection(language.direction);

  if (i18n.language !== language.detector) {
    yield i18n.changeLanguage(language.detector);
  }
}

export function* handleChangeLanguage({ language }) {
  yield i18n.changeLanguage(language.detector);
  yield setPageDirection(language.direction);
}

function setPageDirection(direction) {
  document.getElementsByTagName('html')[0].setAttribute('dir', direction);
}
