import { all } from "redux-saga/effects";

import features from "../features";

export default function* rootSaga() {
  yield all([
    features.auth.sagas(),
    features.users.sagas(),
    features.payments.sagas()
  ]);
}
