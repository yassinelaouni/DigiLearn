import { put } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* checkCodeWorker({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: "api/merchants/checkCode",
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success) {
    yield put(actions.userSet({ user: { ...payload } }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
