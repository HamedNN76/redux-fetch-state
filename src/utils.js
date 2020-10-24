export function actionTypesGenerator(name) {
  return {
    load: `${name}/LOAD`,
    loadSuccess: `${name}/LOAD_SUCCESS`,
    loadFailure: `${name}/LOAD_FAILURE`,
    resetCache: `${name}/RESET_CACHE`,
    resetForm: `${name}/RESET_FORM`,
  };
}
