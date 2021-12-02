// import { CHANGE_AMOUNT, CHANGE_SCORE } from './actionTypes';
import { SET_USER, LOGOUT_USER } from './actionTypes';

const initialState = {
  userName: '',
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userName: '',
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
