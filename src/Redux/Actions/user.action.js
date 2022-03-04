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
} from "./user.types";
import DataService from "../services/api.service";

//.....................................................................................................

// for user management
export const _login = (email, password) => async dispatch => {
  try {
    const res = await DataService.login(email, password);
    console.log(res);

    if (res.status === 200) {
      localStorage.setItem("x-auth-token", JSON.stringify(res.data.token));
      localStorage.setItem(
        "userData",
        JSON.stringify(res.data && res.data.user)
      );

      dispatch({
        type: LOGIN_SUCCESS,
        auth: res //auth is payload we passing to userReducer.js file in user reducer
      });
    }
    return Promise.resolve(res);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      error: err //error is payload we passing to userReducer.js file in user reducer
    });
    return Promise.reject(err);
  }
};
export const _getAllUsers = () => async dispatch => {
  try {
    const res = await DataService.getAllUsers();

    dispatch({
      type: GETALL_USERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postUser = (
  name,
  email,
  mobile,
  role,
  password
) => async dispatch => {
  try {
    const res = await DataService.postUser(name, email, mobile, role, password);

    dispatch({
      type: POST_USERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateUser = (oldData, newData) => async dispatch => {
  try {
    const res = await DataService.updateUser(oldData, newData);

    dispatch({
      type: UPDATE_USERS_SUCCESS,
      payload: newData
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _deleteUser = id => async dispatch => {
  try {
    const res = await DataService.deleteUser(id);

    dispatch({
      type: DELETE_USERS_SUCCESS,
      payload: { id }
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};
// ...................................................................................................
// for Customer management

export const _getAllCustomers = () => async dispatch => {
  try {
    const res = await DataService.getAllCustomers();

    dispatch({
      type: GETALL_CUSOMERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postCustomer = (name, email, mobile) => async dispatch => {
  try {
    const res = await DataService.postCustomer(name, email, mobile);

    dispatch({
      type: POST_CUSOMERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateCustomer = (oldData, newData) => async dispatch => {
  try {
    const res = await DataService.updateCustomer(oldData, newData);

    dispatch({
      type: UPDATE_CUSOMERS_SUCCESS,
      payload: newData
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _deleteCustomer = id => async dispatch => {
  try {
    const res = await DataService.deleteCustomer(id);

    dispatch({
      type: DELETE_CUSOMERS_SUCCESS,
      payload: { id }
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};

// .................................................................................................
// for Customers milk management

export const _getAllMilkDataOfCustomer = () => async dispatch => {
  try {
    const res = await DataService.getAllMilkDataOfCustomer();

    dispatch({
      type: GETALL_CUSOMERS_MILKDATA_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postMilk = (quantity, customer) => async dispatch => {
  try {
    const res = await DataService.postMilkDataOfCust(quantity, customer);

    dispatch({
      type: POST_CUSOMERS_MILKDATA_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateMilkDataOfCustomer = (
  oldData,
  newData
) => async dispatch => {
  try {
    const res = await DataService.updateMilkDataOfCustomer(oldData, newData);

    dispatch({
      type: UPDATE_CUSOMERS_MILKDATA_SUCCESS,
      payload: newData
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _deleteMilkDataOfCustomer = id => async dispatch => {
  try {
    const res = await DataService.deleteMilkDataOfCustomer(id);

    dispatch({
      type: DELETE_CUSOMERS_MILKDATA_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};

export const _getMilkByCustomerId = id => async dispatch => {
  //here id is customer id

  try {
    const res = await DataService.getMilkDataByCustomerId(id);

    dispatch({
      type: GET_SINGLE_CUSOMERS_MILKDATA_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};
// .............................................
export const _forgotPassword = (
  resetPasswordLink,
  newPassword
) => async dispatch => {
  try {
    const res = await DataService.forgotPassword(
      resetPasswordLink,
      newPassword
    );

    dispatch({
      type: FORGOT_PASSWORD,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const _resetPassword = email => async dispatch => {
  try {
    const res = await DataService.resetPassword(email);

    dispatch({
      type: RESET_PASSWORD,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
