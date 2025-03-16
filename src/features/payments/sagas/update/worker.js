import { put, select } from "redux-saga/effects";

import helpers from "helpers";
import config from "../../../../config.json";
import errors from "store/errors";
import actions from "../../actions";
import selectors from "../../selectors";

export default function* updateWorker({ payload = {}, meta = {} }) {
  let { data } = yield helpers.sagas.worker({
    method: "PATCH",
    url: config.endpoints.users.root,
    data: payload,
    loadingId: meta.id,
  });

  if (data?.success && data?.updated) {
    yield put(actions.updated({ client: data.updated }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
