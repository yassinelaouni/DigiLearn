import { put } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* resendCodeWorker({ payload, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "POST",
    url: "api/merchants/resendCode",
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success) {
    yield put(
      errors.actions.updated({
        isSuccess: true,
        show: true,
        message:
          data?.errorMessage,
        id: meta.id,
      })
    );
  }
}
