import { put } from "redux-saga/effects";

import helpers from "../../../../helpers";
import config from "../../../../config.json";
import errors from "../../../../store/errors";
import actions from "../../actions";

export default function* getOneWorker({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: config.endpoints.rating.getOne,
    params: payload,
    loadingId: meta.id,
  });

  if (data?.success && data?.found && data?.count >= 0) {
    yield put(actions.updated({ rating: data?.found }));
    yield put(actions.selectedSet({ id: data?.found ? data?.found.id : null }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  } else {
    yield put(actions.selectedSet({ id: "notFound" }));
    yield put(errors.actions.updated({ isSuccess: false, id: meta.id }));
  }
}
