import { put, select } from "redux-saga/effects";

import helpers from "helpers";
import config from "../../../../config.json";
import errors from "store/errors";

import receiverSelectors from "../../selectors";

export default function* hardDeleteWorker({ meta = {} }) {
  const receiverId = yield select(receiverSelectors.selected);

  let { data } = yield helpers.sagas.worker({
    method: "DELETE",
    url: "api/payments/delete",
    data: { receiverId },
    loadingId: meta.id,
  });

  let actions = [];

  if (data?.success) {
    yield put(
      actions.removed({
        paymentId: data?.paymentId,
        meta
      })
    );
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
