import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import { milkTypeReducer } from "./milkType.reducer"
const rootReducer = combineReducers({
  userData: userReducer,
  milkTypeReducer: milkTypeReducer
});

export default rootReducer;
