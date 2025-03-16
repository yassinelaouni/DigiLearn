import { all } from "redux-saga/effects";

import login from "./login";
import register from "./register";
import verifyEmail from "./verifyEmail";
import checkEmail from "./checkEmail";
import checkCode from "./checkCode";
import resendCode from "./resendCode";
import resetPassword from "./resetPassword";
// import setup from "./setup";
// import logout from "./logout";

export default function* authSaga() {
  yield all([
    login(),
    register(),
    verifyEmail(),
    checkEmail(),
    checkCode(),
    resetPassword(),
    resendCode()
    // setup(),
    // logout(),
  ]);
}
