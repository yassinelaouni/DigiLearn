import { put, select } from "redux-saga/effects";

import helpers from "helpers";
import config from "../../../../config.json";
import errors from "store/errors";
import actions from "../../actions";
import selectors from "../../selectors";


export default function* changeStatusWorker({ payload, meta = {} }) {

  const paymentId = yield select(selectors.selected);

  let { data } = yield helpers.sagas.worker({
    method: "PATCH",
    url: "api/payments/update/status",
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success) {
    // if (data?.updated?.status?.value === "deleted") {
    //   yield put(actions.removed({ id: data?.updated?.paymentId }));
    // } else {
    yield put(
      actions.statusUpdated({
        paymentId: data?.updated?.paymentId,
        status: data?.updated?.status,
        meta
      })
    );
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
    // }


  }
}