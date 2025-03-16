import { put, select } from "redux-saga/effects";

import actions from "../../actions";
import authSelectors from "features/auth/selectors";

export default function* removeWorker({ payload, meta = {} }) {
  // const { role } = yield select(authSelectors.user);
  const { paymentId } = payload

  // if (role === "admin")
  yield put(
    actions.changeStatus({ paymentId, status: "deleted" })
  );
  // else
  //   yield put(actions.hardDelete());
}
