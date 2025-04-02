import { all } from "redux-saga/effects";

import login from "./login";
import register from "./register";
import changeFirstName from "./changeFirstName";
import changeLastName from "./changeLastName";
import changeAvatar from "./changeAvatar";
import changePassword from "./changePassword";
// import setup from "./setup";
// import logout from "./logout";

export default function* authSaga() {
  yield all([
    login(),
    register(),
    // setup(),
    // logout(),
    changeFirstName(),
    changeLastName(),
    changeAvatar(),
    changePassword(),
  ]);
}
