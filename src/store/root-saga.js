import { all } from "redux-saga/effects";

import features from "features";

export default function* rootSaga() {
  yield all([
    features.auth.sagas(),
    features.rating.sagas(),
    features.merchants.sagas(),
    features.buyers.sagas(),
    features.payments.sagas()
  ]);
}
