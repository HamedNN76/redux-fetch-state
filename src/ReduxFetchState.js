import { actionTypesGenerator } from "./utils";

export class ReduxFetchState {
  constructor(name) {
    this.name = name;
    this.initialState = {
      loading: false,
      loaded: false,
      data: null,
      error: null,
      form: null,
    };
    this.actionTypes = actionTypesGenerator(name);
    this.actions = {
      load: (payload, isSilent) => ({
        type: this.actionTypes.load,
        payload,
        isSilent,
      }),
      loadSuccess: (payload) => ({
        type: this.actionTypes.loadSuccess,
        payload,
      }),
      loadFailure: (payload, removeData) => ({
        type: this.actionTypes.loadFailure,
        payload,
        removeData,
      }),
      resetCache: () => ({
        type: this.actionTypes.resetCache,
      }),
      resetForm: () => ({
        type: this.actionTypes.resetForm,
      }),
    };
    this.handlers = {
      [this.actionTypes.load]: (state, action) => {
        return {
          ...state,
          loading: !action.isSilent,
          loaded: action.isSilent,
          error: null,
          form: action.payload,
        };
      },
      [this.actionTypes.loadSuccess]: (state, action) => {
        return {
          ...state,
          loading: false,
          loaded: true,
          form: null,
          error: null,
          data: action.payload,
        };
      },
      [this.actionTypes.loadFailure]: (state, action) => {
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.payload,
          data: action.removeData ? null : state.data,
        };
      },
      [this.actionTypes.resetCache]: () => this.initialState,
      [this.actionTypes.resetForm]: (state) => {
        return {
          ...state,
          form: null,
        };
      },
    };
    this.generateReducer();
  }

  generateReducer = () => {
    this.reducer = (state = this.initialState, action) => {
      if (this.handlers.hasOwnProperty(action.type)) {
        return this.handlers[action.type](state, action);
      } else {
        return state;
      }
    };
  };

  addCustomAction = (actionKey, actionName, handler) => {
    const actionType = `${this.name}/${actionName}`;
    this.actionTypes = {
      ...this.actionTypes,
      [actionKey]: actionType,
    };
    this.actions = {
      ...this.actions,
      [actionKey]: (payload) => ({
        type: this.actionTypes[actionKey],
        payload,
      }),
    };
    this.handlers = {
      ...this.handlers,
      [actionType]: handler,
    };
    this.generateReducer();
  };
}
