import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* changePassword() {
    yield takeLatest(types.changePassword, worker);
}
