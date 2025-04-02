import { combineReducers } from "redux";

import errors from "./errors";
import loading from "./loading";

import features from "../features";

const rootReducer = combineReducers({
  errors: errors.reducer,
  loading: loading.reducer,
  auth: features.auth.reducer,
  user: features.users.reducer,
  payment: features.payments.reducer,
});

export default rootReducer;
