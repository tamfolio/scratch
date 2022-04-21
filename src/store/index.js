import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import accountData from './reducers/account';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const appReducer = combineReducers({
  accountData,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case 'RESET_APP':
      state = undefined;
  }
  return appReducer(state, action);
};

const middleware = compose(applyMiddleware(thunkMiddleware));
const makeStore = (context) => createStore(rootReducer, middleware);
export const wrapper = createWrapper(makeStore, { debug: true });

