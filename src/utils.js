export function actionTypesGenerator(name) {
  return {
    load: `${name}/LOAD`,
    loadSuccess: `${name}/LOAD_SUCCESS`,
    loadFailure: `${name}/LOAD_FAILURE`,
    resetCache: `${name}/RESET_CACHE`,
    resetForm: `${name}/RESET_FORM`,
  };
}

/*export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}*/
