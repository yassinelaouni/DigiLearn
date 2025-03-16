import { takeLatest } from "redux-saga/effects";
import worker from "./worker";
import types from "../../actionsTypes";

export default function* addOne() {
  yield takeLatest(types.addOne, worker);
}
