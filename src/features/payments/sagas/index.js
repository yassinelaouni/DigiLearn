import { all } from "redux-saga/effects";

import getMany from "./getMany";
import changeStatus from "./changeStatus";
import hardDelete from "./hardDelete";

import remove from "./remove";
import update from "./update";

export default function* authSaga() {
  yield all([
    update(),
    remove(),
    getMany(),
    changeStatus(),
    hardDelete(),
  ]);
}
