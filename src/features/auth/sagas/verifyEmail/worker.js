import { put } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* verifyEmailWorker({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: "api/merchants/verifyEmail",
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success) {
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
