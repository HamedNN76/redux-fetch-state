# Redux Fetch State

A simple package that provide actions, actionTypes and reducer for making API calls.

## Description

For any API call using redux we need a state, actions and action creators:

This class provides:

1.  actions: `load, loadSuccess, loadFailure, resetCache, resetForm`
2.  actionTypes: `LOAD, LOAD_SUCCESS, LOAD_FAILURE, RESET_CACHE, RESET_FORM`
3.  reducer: `initialState: { loading: false, loaded: false, error: null, data: null, // fetched data form: null, // submitted form }`
4.  addCustomClass: This method allow you to add any custom action.

We need actions to perform our API call:

```
export const LOAD_SOMETHING = 'LOAD_SOMETHING';
export const LOAD_SUCCESS_SOMETHING = 'LOAD_SUCCESS_SOMETHING';
export const LOAD_FAILURE_SOMETHING = 'LOAD_FAILURE_SOMETHING';
```

And action creators:

```
export const loadSomething = (payload) => ({
    type: LOAD_SOMETHING,
    payload, // submitted form
});
export const loadSuccessSomething = (payload) => ({
    type: LOAD_SUCCESS_SOMETHING,
    payload, // fetched data
});
export const loadFailureSomething = (payload) => ({
    type: LOAD_FAILURE_SOMETHING,
    payload, // error
});
```

## Installing

Easily installing from npm with blow command:

```
npm i -s redux-fetch-state
```

### Using the package

This package provide ReduxFetchState class. So you have to make a new instance on every api call that is going to handle on redux.
We have to pass one parameter to this class called key, to separate each fetch actions.

For example you can make getUsers.js file like this:

```
import ReduxFetchState from 'redux-fetch-state';

export const { actions, actionTypes, reducer, addCustomAction } = new ReduxFetchState("getUsers");

addCustomAction('actionKey', 'ACTION_NAME', (state, action) => ({
    ...state,
    someChange: action.payload,
});

/*
actionTypes = {
  load: `getUsers/LOAD`,
  loadSuccess: `getUsers/LOAD_SUCCESS`,
  loadFailure: `getUsers/LOAD_FAILURE`,
  resetCache: `getUsers/RESET_CACHE`,
  resetForm: `getUsers/RESET_FORM`,
  actionKey: `getUsers/ACTION_NAME`,
};

actions = {
  load: (payload) => ({
    type: `getUsers/LOAD`,
    payload,
  }),
  actionKey: (payload) => ({
    type: `getUsers/LOAD`,
    payload,
  }),
  ...
};
*/

export { reducer as getUsers };
```

store.js file:

```
...

import { getUsers } from 'path/to/getUsers';

...

combineReducers({
    ...,
    getUsers,
});

```

## Example

A Simple react application that fetch jsonplaceholder and list the users.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
