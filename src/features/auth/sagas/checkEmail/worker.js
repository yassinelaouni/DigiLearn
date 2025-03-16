import { put } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* checkEmailWorker({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: "api/merchants/checkEmail",
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success) {
    yield put(actions.userSet({ user: { email: payload.email } }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
