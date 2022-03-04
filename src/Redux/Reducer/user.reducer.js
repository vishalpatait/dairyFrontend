import {
  GETALL_USERS_SUCCESS,
  DELETE_USERS_SUCCESS,
  POST_USERS_SUCCESS,
  UPDATE_USERS_SUCCESS,
  GETALL_CUSOMERS_SUCCESS,
  DELETE_CUSOMERS_SUCCESS,
  POST_CUSOMERS_SUCCESS,
  UPDATE_CUSOMERS_SUCCESS,
  GETALL_CUSOMERS_MILKDATA_SUCCESS,
  DELETE_CUSOMERS_MILKDATA_SUCCESS,
  POST_CUSOMERS_MILKDATA_SUCCESS,
  UPDATE_CUSOMERS_MILKDATA_SUCCESS,
  GET_SINGLE_CUSOMERS_MILKDATA_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL, FORGOT_PASSWORD, RESET_PASSWORD
} from "./../Actions/user.types";

const initialState = {
  authorization: [],
  users: [],
  customers: [],
  customersMilkData: []
};

function userReducer(state = initialState, action) {
  const { type, payload, auth, error } = action;

  switch (type) {
    //for users
    case LOGIN_SUCCESS:
      state = {
        ...state,

        authorization: auth //auth is payload we get from user.acttion.js file in login action
      };

      break;
    case LOGIN_FAIL:
      state = {
        ...state,

        authorization: error //error is payload we get from user.acttion.js file in login action
      };
    case FORGOT_PASSWORD:
      state = {
        ...state,

        users: payload
      };
      break;
    case RESET_PASSWORD:
      state = {
        ...state,

        users: payload
      };
      break;
    case GETALL_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case POST_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case DELETE_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case UPDATE_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    //for customers
    case GETALL_CUSOMERS_SUCCESS:
      state = {
        ...state,

        customers: payload
      };
      break;
    case POST_CUSOMERS_SUCCESS:
      state = {
        ...state,

        customers: payload
      };
      break;
    case DELETE_CUSOMERS_SUCCESS:
      state = {
        ...state,

        customers: payload
      };
      break;
    case UPDATE_CUSOMERS_SUCCESS:
      state = {
        ...state,

        customers: payload
      };
      break;
    //for customersMilkData
    case GETALL_CUSOMERS_MILKDATA_SUCCESS:
      state = {
        ...state,

        customersMilkData: payload
      };
      break;
    case POST_CUSOMERS_MILKDATA_SUCCESS:
      state = {
        ...state,

        customersMilkData: payload
      };
      break;
    case DELETE_CUSOMERS_MILKDATA_SUCCESS:
      state = {
        ...state,

        customersMilkData: payload
      };
      break;
    case UPDATE_CUSOMERS_MILKDATA_SUCCESS:
      state = {
        ...state,

        customersMilkData: payload
      };
      break;

    case GET_SINGLE_CUSOMERS_MILKDATA_SUCCESS:
      state = {
        ...state,

        customersMilkData: payload
      };
      break;
    default:
      return state;
  }
  return state;
}

export default userReducer;
