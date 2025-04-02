import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* changeAvatar() {
    yield takeLatest(types.changeAvatar, worker);
}
