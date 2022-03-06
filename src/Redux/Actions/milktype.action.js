import {
  GETALL_MILKTYPES,
  DELETE_MILKTYPES,
  POST_MILKTYPES,
  UPDATE_MILKTYPES,
  GET_SINGLE_MILKTYPES
} from "./../Actions/milkType.types";
import DataService from "../services/api.service";
var configData = require("../config");
var Api = configData.Api;
export const getAllMilkTypes = () => {
  return dispatch => {
    return Api.get("/milktype")
      .then(res => {
        dispatch(setMilktypes(res.data));
      })
      .catch(err => {
        return err;
      });
  };
};

export const setMilktypes = data => ({
  type: GETALL_MILKTYPES,
  payload: data
});

export const postMilkTypes = data => {
  return dispatch => {
    return Api.post("/milktype", data)
      .then(res => {
        dispatch(setPostedMilktypes(res.data));
      })
      .catch(err => {
        return err;
      });
  };
};

export const setPostedMilktypes = data => ({
  type: POST_MILKTYPES,
  payload: data
});

export const updateMilkTypes = (oldData, newData) => {
  return dispatch => {
    return Api.put(`/milktype/${oldData.id}`, newData) // API.update(`/milktype${id}`, data) or API.update('/milktype',{params:data} )
      .then(res => {
        dispatch(setUpdatedMilktypes(res.data));
      })
      .catch(err => {
        return err;
      });
  };
};

export const setUpdatedMilktypes = data => ({
  type: UPDATE_MILKTYPES,
  payload: data
});

export const deleteMilkTypes = data => {
  return dispatch => {
    Api.delete(`/milktype/${data.id}`) // API.delete(`/milktype${id}`, data) or API.delete('/milktype',{params:data} )
      .then(res => {
        dispatch(setDeletedMilktypes(res.data));
      })
      .catch(err => {
        return err;
      });
  };
};

export const setDeletedMilktypes = data => ({
  type: DELETE_MILKTYPES,
  payload: data
});

export const singleMilkType = () => {
  return dispatch => {
    return DataService.getMilkTypeById() // API.get(`/milktype${id}`, data) or API.delete('/milktype',{params:data} )
      .then(res => {
        dispatch(setSingleMilktypes(res.data));
      })
      .catch(err => {
        return err;
      });
  };
};

export const setSingleMilktypes = data => ({
  type: GET_SINGLE_MILKTYPES,
  payload: data
});
