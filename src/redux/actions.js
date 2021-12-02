// import { CHANGE_AMOUNT, CHANGE_SCORE } from './actionTypes';
import { SET_USER, LOGOUT_USER } from './actionTypes';

// export const handleScoreChange = (payload) => ({
//   type: CHANGE_SCORE,
//   payload,
// });

// export const handleAmountChange = (payload) => ({
//   type: CHANGE_AMOUNT,
//   payload,
// });

export const handleUserLogin = (payload) => ({
  type: SET_USER,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
