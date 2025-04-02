import { put, select } from "redux-saga/effects";

import errors from "../../../../store/errors";
import actions from "../../../../features/payments/actions";
import usersActions from "../../../../features/users/actions";
import buyersSelectors from "../../selectors";
import normalizer from '../../normalizer'
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* getMany({ meta = {} }) {
  const filter = yield select(buyersSelectors.filter);

  let { data } = yield helpers.sagas.worker({
    method: "GET",
    url: config.endpoints.payment.get,
    params: { ...filter },
    loadingId: meta.id,
  });

  if (data?.success && data?.found) {
    const { users, payments } = normalizer(data?.found)
    // console.log("sagas :", users)
    yield put(usersActions.merged({
      users: Object.entries(users).map(([id, data]) => {
        return { id, ...data };
      })
    }))
    yield put(actions.merged({ many: payments }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
