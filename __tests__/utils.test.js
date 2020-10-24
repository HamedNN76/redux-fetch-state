import { actionTypesGenerator } from "../src/utils";

describe("Utils", () => {
  describe("actionTypeGenerator", () => {
    it("Should be defined", () => {
      expect(actionTypesGenerator).toBeDefined();
    });

    it("Should be a function", () => {
      expect(typeof actionTypesGenerator).toBe("function");
    });

    it("Should return loading actions", () => {
      const name = "Test";
      expect(actionTypesGenerator(name)).toEqual({
        load: `${name}/LOAD`,
        loadSuccess: `${name}/LOAD_SUCCESS`,
        loadFailure: `${name}/LOAD_FAILURE`,
        resetCache: `${name}/RESET_CACHE`,
        resetForm: `${name}/RESET_FORM`,
      });
    });
  });
});
