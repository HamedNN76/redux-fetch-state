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

  /*describe("createReducer", () => {
    const initialState = {
      key: "value",
    };
    const handlers = {
      testAction: (state, action) => {
        const payload = action.payload;
        return {
          ...state,
          payload,
        };
      },
    };
    it("Should be defined", () => {
      expect(createReducer).toBeDefined();
    });

    it("Should be a function", () => {
      expect(typeof createReducer).toBe("function");
    });

    it("Should return reducer function", () => {
      const reducer = createReducer(initialState, handlers);
      expect(typeof reducer).toBe("function");
      expect(reducer.name).toBe("reducer");
    });

    it("Should return handler new state if there is valid handler", () => {
      const payload = "test payload";
      const testAction = {
        type: "testAction",
        payload,
      };
      const newState = {
        ...initialState,
        payload,
      };
      expect(
        createReducer(initialState, handlers)(initialState, testAction)
      ).toEqual(newState);
    });

    it("Should return state if there is no valid handler", () => {
      const notValidAction = {
        type: "notValidAction",
      };
      expect(
        createReducer(initialState, handlers)(initialState, notValidAction)
      ).toEqual(initialState);
    });
  });*/
});
