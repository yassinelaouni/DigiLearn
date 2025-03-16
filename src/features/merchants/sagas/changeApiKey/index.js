import { takeLatest } from "redux-saga/effects";
import types from "../../actionsTypes";
import worker from "./worker";

export default function* changeApiKey() {
    yield takeLatest(types.changeApiKey, worker);
}
