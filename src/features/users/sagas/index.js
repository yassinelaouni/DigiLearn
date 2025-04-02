import { all } from "redux-saga/effects";

import get from "./get";
import remove from "./remove";

export default function* ratingSaga() {
    yield all([
        get(),
        remove(),
    ]);
} 