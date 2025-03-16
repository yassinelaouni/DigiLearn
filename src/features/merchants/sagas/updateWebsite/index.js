import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* updateWebsite() {
    yield takeLatest(types.updateWebsite, worker);
}
