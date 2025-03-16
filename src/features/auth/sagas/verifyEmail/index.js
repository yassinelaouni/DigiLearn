import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* verifyEmail() {
  yield takeLatest(types.verifyEmail, worker);
}
