import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* resetPassword() {
    yield takeLatest(types.resetPassword, worker);
}