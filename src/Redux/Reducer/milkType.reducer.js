import {
  GETALL_MILKTYPES,
  DELETE_MILKTYPES,
  POST_MILKTYPES,
  UPDATE_MILKTYPES,
  GET_SINGLE_MILKTYPES
} from "./../Actions/milkType.types";

const initialState = {
  milkTypeData: [],
  milkTypeDataUpdated: []
};

export const milkTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_MILKTYPES:
      return {
        ...state,
        milkTypeData: action.payload
      };
    case DELETE_MILKTYPES:
      return {
        ...state,
        milkTypeDataUpdated: action.payload
      };
    case POST_MILKTYPES:
      return {
        ...state,
        milkTypeDataUpdated: action.payload
      };
    case UPDATE_MILKTYPES:
      return {
        ...state,
        milkTypeDataUpdated: action.payload
      };
    case GET_SINGLE_MILKTYPES:
      return {
        ...state,
        milkTypeDataUpdated: action.payload
      };
    default:
      return state;
  }
};
