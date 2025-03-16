import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* changePhone() {
    yield takeLatest(types.changePhone, worker);
}
