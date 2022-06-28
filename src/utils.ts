export function actionTypesGenerator(name: string) {
  return {
    load: `${name}/LOAD`,
    loadSuccess: `${name}/LOAD_SUCCESS`,
    loadFailure: `${name}/LOAD_FAILURE`,
    resetCache: `${name}/RESET_CACHE`,
    resetForm: `${name}/RESET_FORM`,
  };
}
