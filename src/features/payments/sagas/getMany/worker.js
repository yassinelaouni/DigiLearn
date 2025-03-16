import { put, select } from "redux-saga/effects";

import errors from "store/errors";
import actions from "features/payments/actions";
import merchantsActions from "features/merchants/actions";
import buyersSelectors from "../../selectors";
import normalizer from '../../normalizer'
import helpers from "helpers";
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
    const { merchants, payments } = normalizer(data?.found)
    // console.log("sagas :", merchants)
    yield put(merchantsActions.merged({
      merchants: Object.entries(merchants).map(([id, data]) => {
        return { id, ...data };
      })
    }))
    yield put(actions.merged({ many: payments }));
    yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
  }
}
