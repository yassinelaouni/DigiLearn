import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* changeFirstName() {
    yield takeLatest(types.changeFirstName, worker);
}
