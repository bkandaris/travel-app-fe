// import { CHANGE_AMOUNT, CHANGE_SCORE } from './actionTypes';
import { SET_USER } from './actionTypes';

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
    //     case CHANGE_AMOUNT:
    //       return {
    //         ...state,
    //         amount_of_questions: action.payload,
    //       };
    //     case CHANGE_SCORE:
    //       return {
    //         ...state,
    //         score: action.payload,
    //       };
    default:
      return state;
  }
};

export default reducer;
