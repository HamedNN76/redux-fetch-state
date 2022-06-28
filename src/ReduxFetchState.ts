import {actionTypesGenerator} from './utils';
import {Reducer} from 'redux';

export type State<Data, Form, Error, CustomFields> = {
  loading: boolean;
  loaded: boolean;
  form: Form | null;
  data: Data | null;
  error: Error | null;
} & {
  [Prop in keyof CustomFields]: CustomFields[Prop];
};

export type ActionTypes<CustomActions> = {
  load: string;
  loadSuccess: string;
  loadFailure: string;
  resetCache: string;
  resetForm: string;
} & {
  [key in keyof CustomActions]: string;
};

export type Actions<Data, Form, Error, CustomActions> = {
  load: (
    form?: Form,
    isSilent?: boolean,
  ) => {
    type: string;
    payload: Form;
    isSilent: boolean;
  };
  loadSuccess: (data?: Data) => {
    type: string;
    payload: Data;
  };
  loadFailure: (
    error?: Error,
    removeData?: boolean,
  ) => {
    type: string;
    payload: Error;
    removeData: boolean;
  };
  resetCache: () => {
    type: string;
  };
  resetForm: () => {
    type: string;
  };
} & {
  [Prop in keyof CustomActions]: (payload: CustomActions[Prop]) => {
    type: string;
    payload: CustomActions[Prop];
  };
};

export type Handlers = {
  [key: string]: Function;
};

export class ReduxFetchState<
  Data = any,
  Form = any,
  Error = any,
  CustomFields = any,
  CustomActions = any,
> {
  public name: string;
  public initialState: State<Data, Form, Error, CustomFields>;
  public actionTypes: ActionTypes<CustomActions>;
  public actions: Actions<Data, Form, Error, CustomActions>;
  public handlers: Handlers;
  // @ts-ignore
  public reducer: Reducer<State<Data, Form, Error, CustomFields>>;

  constructor(
    name: string,
    initialValues: Partial<State<Data, Form, Error, CustomFields>> = {},
  ) {
    this.name = name;

    this.initialState = {
      loading: false,
      loaded: false,
      data: null,
      error: null,
      form: null,
      ...initialValues,
    } as State<Data, Form, Error, CustomFields>;

    this.actionTypes = actionTypesGenerator(name) as ActionTypes<CustomActions>;

    this.actions = {
      load: (payload, isSilent) => ({
        type: this.actionTypes.load,
        payload,
        isSilent,
      }),
      loadSuccess: payload => ({
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
    } as Actions<Data, Form, Error, CustomActions>;

    this.handlers = {
      [this.actionTypes.load]: (
        state: State<Data, Form, Error, CustomFields>,
        action: {
          type: string;
          payload: Form;
          isSilent: boolean;
        },
      ) => {
        return {
          ...state,
          loading: !action.isSilent,
          loaded: action.isSilent,
          error: null,
          form: action.payload,
        };
      },
      [this.actionTypes.loadSuccess]: (
        state: State<Data, Form, Error, CustomFields>,
        action: {
          type: string;
          payload: Data;
        },
      ) => {
        return {
          ...state,
          loading: false,
          loaded: true,
          form: null,
          error: null,
          data: action.payload,
        };
      },
      [this.actionTypes.loadFailure]: (
        state: State<Data, Form, Error, CustomFields>,
        action: {
          type: string;
          payload: Error;
          removeData: boolean;
        },
      ) => {
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.payload,
          data: action.removeData ? null : state.data,
        };
      },
      [this.actionTypes.resetCache]: () => this.initialState,
      [this.actionTypes.resetForm]: (
        state: State<Data, Form, Error, CustomFields>,
      ) => {
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

  public addCustomAction = <Key extends keyof object>(
    actionKey: Key,
    actionName: string,
    handler: (
      state: State<Data, Form, Error, CustomFields>,
      action: {
        type: string;
      } & {
        payload: CustomActions[Key];
      },
    ) => State<Data, Form, Error, CustomFields>,
  ) => {
    const actionType = `${this.name}/${actionName}`;
    this.actionTypes = {
      ...this.actionTypes,
      [actionKey]: actionType,
    };
    this.actions = {
      ...this.actions,
      [actionKey]: (payload: CustomActions[Key]) => ({
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
