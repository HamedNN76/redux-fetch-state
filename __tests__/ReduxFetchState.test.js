import { ReduxFetchState } from "../src/ReduxFetchState";
import { actionTypesGenerator } from "../src/utils";

describe("ReduxFetchState", () => {
  const reduxFetchStateInitialValue = {
    loading: false,
    loaded: false,
    data: null,
    error: null,
    form: null,
  };
  const name = "testName";
  const reduxFetchState = new ReduxFetchState(name);

  it("Should be defined", () => {
    expect(ReduxFetchState).toBeDefined();
  });

  it("Initial value has to set", () => {
    const reduxFetchState = new ReduxFetchState();
    expect(reduxFetchState.initialState).toEqual(reduxFetchStateInitialValue);
  });

  it("Should pass name to class as first parameter", () => {
    expect(reduxFetchState.name).toBe(name);
  });

  it("Action types", () => {
    expect(reduxFetchState.actionTypes).toEqual(actionTypesGenerator(name));
  });

  it("Action creators", () => {
    const payload = {};
    const isSilent = true;
    const removeData = true;

    expect(reduxFetchState.actions.load(payload, isSilent)).toEqual({
      type: reduxFetchState.actionTypes.load,
      payload,
      isSilent,
    });
    expect(reduxFetchState.actions.loadSuccess(payload)).toEqual({
      type: reduxFetchState.actionTypes.loadSuccess,
      payload,
    });
    expect(reduxFetchState.actions.loadFailure(payload, removeData)).toEqual({
      type: reduxFetchState.actionTypes.loadFailure,
      payload,
      removeData,
    });
    expect(reduxFetchState.actions.resetCache()).toEqual({
      type: reduxFetchState.actionTypes.resetCache,
    });
    expect(reduxFetchState.actions.resetForm()).toEqual({
      type: reduxFetchState.actionTypes.resetForm,
    });
  });

  describe("Handlers object", () => {
    it("Should have handlers object", () => {
      expect(reduxFetchState.handlers).toBeDefined();
    });

    it("Should have load handler", () => {
      const loadHandler =
        reduxFetchState.handlers[reduxFetchState.actionTypes.load];
      expect(typeof loadHandler).toBe("function");
      const loadAction = {
        type: reduxFetchState.actionTypes.load,
        payload: "Some submitted form values",
        isSilent: true,
      };
      expect(loadHandler(reduxFetchStateInitialValue, loadAction)).toEqual({
        ...reduxFetchStateInitialValue,
        loading: !loadAction.isSilent,
        loaded: loadAction.isSilent,
        error: null,
        form: loadAction.payload,
      });
    });

    it("Should have loadSuccess handler", () => {
      const loadSuccessHandler =
        reduxFetchState.handlers[reduxFetchState.actionTypes.loadSuccess];
      expect(typeof loadSuccessHandler).toBe("function");
      const loadSuccessAction = {
        type: reduxFetchState.actionTypes.loadSuccess,
        payload: "Some fetched data from api",
      };
      expect(
        loadSuccessHandler(reduxFetchStateInitialValue, loadSuccessAction)
      ).toEqual({
        ...reduxFetchStateInitialValue,
        loading: false,
        loaded: true,
        form: null,
        error: null,
        data: loadSuccessAction.payload,
      });
    });

    it("Should have loadFailure handler", () => {
      const loadFailureHandler =
        reduxFetchState.handlers[reduxFetchState.actionTypes.loadFailure];
      expect(typeof loadFailureHandler).toBe("function");
      const loadFailureAction = {
        type: reduxFetchState.actionTypes.loadFailure,
        payload: "Some bad error happened",
        removeData: true,
      };
      expect(
        loadFailureHandler(reduxFetchStateInitialValue, loadFailureAction)
      ).toEqual({
        ...reduxFetchStateInitialValue,
        loading: false,
        loaded: false,
        error: loadFailureAction.payload,
        data: null,
      });

      loadFailureAction.removeData = false;
      expect(
        loadFailureHandler(reduxFetchStateInitialValue, loadFailureAction)
      ).toEqual({
        ...reduxFetchStateInitialValue,
        loading: false,
        loaded: false,
        error: loadFailureAction.payload,
        data: reduxFetchStateInitialValue.data,
      });
    });

    it("Should handle resetCache handler", () => {
      const resetCacheHandler =
        reduxFetchState.handlers[reduxFetchState.actionTypes.resetCache];
      expect(typeof resetCacheHandler).toBe("function");

      const resetCacheAction = {
        type: reduxFetchState.actionTypes.resetCache,
      };
      expect(
        resetCacheHandler(reduxFetchStateInitialValue, resetCacheAction)
      ).toEqual(reduxFetchStateInitialValue);
    });

    it("Should handle resetForm handler", () => {
      const resetFormHandler =
        reduxFetchState.handlers[reduxFetchState.actionTypes.resetForm];
      expect(typeof resetFormHandler).toBe("function");

      const resetFormAction = {
        type: reduxFetchState.actionTypes.resetForm,
      };
      expect(
        resetFormHandler(reduxFetchStateInitialValue, resetFormAction)
      ).toEqual({
        ...reduxFetchStateInitialValue,
        form: null,
      });
    });
  });

  describe("Generate reducer", () => {
    it("Should be defined and be a function", () => {
      expect(reduxFetchState.reducer).toBeDefined();
      expect(typeof reduxFetchState.reducer).toBe("function");
    });

    it("Should return initialState in the beginning", () => {
      expect(reduxFetchState.reducer(reduxFetchState.initialState, {})).toEqual(
        reduxFetchStateInitialValue
      );
    });

    it("New state after dispatching load action", () => {
      const submittedFormValues = {
        username: "test",
        password: "Test",
      };
      const isSilent = true;

      const newStateReturnedFromReducer = reduxFetchState.reducer(
        undefined,
        reduxFetchState.actions.load(submittedFormValues, isSilent)
      );
      expect(newStateReturnedFromReducer).toEqual({
        ...reduxFetchState.initialState,
        loading: !isSilent,
        loaded: isSilent,
        error: null,
        form: submittedFormValues,
      });
    });
    it("New state after dispatching loadSuccess action", () => {
      const fetchedData = {
        id: "1",
        userType: "admin",
        username: "test",
      };
      const newStateReturnedFromReducer = reduxFetchState.reducer(
        undefined,
        reduxFetchState.actions.loadSuccess(fetchedData)
      );
      expect(newStateReturnedFromReducer).toEqual({
        ...reduxFetchState.initialState,
        loading: false,
        loaded: true,
        data: fetchedData,
        form: null,
        error: null,
      });
    });
    describe("New state after dispatching loadFailure action", () => {
      const occurredError = "something bad happened at api or something else";
      const state = {
        ...reduxFetchStateInitialValue,
        loading: true,
        loaded: false,
        data: "something",
      };
      it("Should removeData and return new state with data: null", () => {
        const newStateReturnedFromReducer = reduxFetchState.reducer(
          state,
          reduxFetchState.actions.loadFailure(occurredError, true)
        );
        expect(newStateReturnedFromReducer).toEqual({
          ...state,
          loading: false,
          loaded: false,
          error: occurredError,
          data: null,
        });
      });
      it("Should not removeData and return with state.data", () => {
        const newStateReturnedFromReducer = reduxFetchState.reducer(
          state,
          reduxFetchState.actions.loadFailure(occurredError, false)
        );
        expect(newStateReturnedFromReducer).toEqual({
          ...state,
          loading: false,
          loaded: false,
          error: occurredError,
          data: state.data,
        });
      });
    });
    it("New state after dispatching resetCache action", () => {
      const state = {
        loading: false,
        loaded: true,
        data: "some data",
        error: null,
        form: null,
      };
      const newStateReturnedFromReducer = reduxFetchState.reducer(
        state,
        reduxFetchState.actions.resetCache()
      );
      expect(newStateReturnedFromReducer).toEqual(reduxFetchStateInitialValue);
    });
    it("New state after dispatching resetForm action", () => {
      const state = {
        ...reduxFetchStateInitialValue,
        form: "some submitted form value",
      };
      const newStateReturnedFromReducer = reduxFetchState.reducer(
        state,
        reduxFetchState.actions.resetForm()
      );
      expect(newStateReturnedFromReducer).toEqual({
        ...state,
        form: null,
      });
    });
  });

  describe("Custom Action", () => {
    const customActionKey = "customAction";
    const customActionName = "CUSTOM_ACTION";
    const customActionType = `${name}/${customActionName}`;
    it("Should provide addCustomAction", () => {
      expect(reduxFetchState.addCustomAction).toBeDefined();
      expect(typeof reduxFetchState.addCustomAction).toBe("function");
    });

    it("Should add custom action to actionTypes", () => {
      reduxFetchState.addCustomAction(customActionKey, customActionName);
      expect(reduxFetchState.actionTypes[customActionKey]).toBe(
        customActionType
      );
    });

    it("Should add custom action creator to actions", () => {
      reduxFetchState.addCustomAction(customActionKey, customActionName);
      const action = reduxFetchState.actions[customActionKey];
      const payload = "some payload";
      expect(action).toBeDefined();
      expect(typeof action).toBe("function");
      expect(action(payload)).toEqual({
        type: customActionType,
        payload,
      });
    });

    it("Should add handler", () => {
      reduxFetchState.addCustomAction(
        customActionKey,
        customActionName,
        (state, action) => {
          return {
            ...state,
            testKey: action.payload,
          };
        }
      );
      const handler = reduxFetchState.handlers[customActionType];
      expect(handler).toBeDefined();
      expect(typeof handler).toBe("function");
      const action = reduxFetchState.actions.customAction(
        "custom action payload after handler added"
      );
      expect(handler(reduxFetchStateInitialValue, action)).toEqual({
        ...reduxFetchStateInitialValue,
        testKey: "custom action payload after handler added",
      });
    });
  });
});
