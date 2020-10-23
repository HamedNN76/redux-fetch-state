import {
  reduxFetchActionTypesGenerator,
  reduxFetchStateInitialValue,
} from "./config";

export class ReduxFetchState {
  constructor(name) {
    this.name = name;
    this.initialState = reduxFetchStateInitialValue;
    this.actionTypes = reduxFetchActionTypesGenerator(name);
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
    this.reducer = (state = this.initialState, action) => {
      switch (action.type) {
        case this.actionTypes.load:
          return {
            ...state,
            loading: !action.isSilent,
            loaded: action.isSilent,
            error: null,
            form: action.payload,
          };
        case this.actionTypes.loadSuccess:
          return {
            ...state,
            loading: false,
            loaded: true,
            form: null,
            error: null,
            data: action.payload,
          };
        case this.actionTypes.loadFailure:
          return {
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
            data: action.removeData ? null : state.data,
          };
        case this.actionTypes.resetCache:
          return this.initialState;
        case this.actionTypes.resetForm:
          return {
            ...state,
            form: null,
          };
        default:
          return state;
      }
    };
  }
}
