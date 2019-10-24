import { createStore } from 'redux';

const initialState = {
  username: '',
  services: [],
  query: '',
  unavailableDates: [],
  cart: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, username: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_UNAVAILABLE_DATES':
      return { ...state, unavailableDates: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'ADD_TO_CART':
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'LOGOUT':
      return { ...state, username: '' };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
