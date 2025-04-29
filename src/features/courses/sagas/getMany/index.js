import { takeLatest } from "redux-saga/effects";
import worker from "./worker";
import types from "../../actionsTypes";

export default function* getMany() {
  yield takeLatest(types.getMany, worker);
}
