import { ReduxFetchState } from "../src/ReduxFetchState";
import {
  reduxFetchActionTypesGenerator,
  reduxFetchStateInitialValue,
} from "../src/config";

describe("ReduxFetchState", () => {
  it("Should be defined", () => {
    expect(ReduxFetchState).toBeDefined();
  });

  it("Initial value has to set", () => {
    const reduxFetchState = new ReduxFetchState();
    expect(reduxFetchState.initialState).toEqual(reduxFetchStateInitialValue);
  });

  const name = "testName";
  it("Should pass name to class as first parameter", () => {
    const reduxFetchState = new ReduxFetchState(name);
    expect(reduxFetchState.name).toBe(name);
  });

  it("Action types", () => {
    const reduxFetchState = new ReduxFetchState(name);
    expect(reduxFetchState.actionTypes).toEqual(
      reduxFetchActionTypesGenerator(name)
    );
  });

  it("Action creators", () => {
    const reduxFetchState = new ReduxFetchState(name);
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

  describe("Generate reducer", () => {
    const reduxFetchState = new ReduxFetchState(name);

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
    it("New state after dispatching loadFailure action", () => {
      const occurredError = "something bad happened at api or something else";
      const removeData = true;
      const state = {
        ...reduxFetchStateInitialValue,
        loading: true,
        loaded: false,
        data: {
          key: "value",
        },
      };
      const newStateReturnedFromReducer = reduxFetchState.reducer(
        state,
        reduxFetchState.actions.loadFailure(occurredError, removeData)
      );
      expect(newStateReturnedFromReducer).toEqual({
        ...reduxFetchState.initialState,
        loading: false,
        loaded: false,
        data: removeData ? null : state.data,
        error: occurredError,
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
});
