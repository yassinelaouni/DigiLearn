import { put } from "redux-saga/effects";

import helpers from "../../../../helpers";
import config from "../../../../config.json";
import errors from "store/errors";
import actions from "../../actions";

export default function* addOne({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: config.endpoints.rating.addOne,
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success && data?.added) {
    yield put(actions.updated({ rating: data?.added }));
    yield put(actions.selectedSet({ id: meta?.id }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta?.id }));
    yield put(
      errors.actions.updated({
        isSuccess: true,
        show: true,
        message: data?.errorMessage,
        id: meta.id,
      })
    );
  } else {
    yield put(
      errors.actions.updated({
        isSuccess: false,
        show: true,
        message: data?.added?.errorMessage,
        id: meta.id,
      })
    );
  }
}
