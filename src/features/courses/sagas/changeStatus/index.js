import { takeLatest } from "redux-saga/effects";
import worker from "./worker";
import types from "../../actionsTypes";

export default function* changeStatus() {
  yield takeLatest(types.changeStatus, worker);
}
