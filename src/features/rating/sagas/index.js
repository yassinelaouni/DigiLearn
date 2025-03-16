import { all } from "redux-saga/effects";

import addOne from "./addOne";
import getOne from "./getOne";

export default function* ratingSaga() {
  yield all([
    getOne(),
    addOne()
  ]);
}
