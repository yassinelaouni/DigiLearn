import { put, call, select } from "redux-saga/effects";
import loading from "store/loading";
import onResponseError from "./on-response-error";
import onApiCallError from "./on-api-call-error";
import services from "services";
import features from "features";

export default function* worker({
  method = "GET",
  url,
  data,
  params,
  headers,
  auth,
  loadingId: id,
}) {
  const token = yield select(features.auth.selectors.token);
  let response;

  let parameters = {
    method,
    url,
    data,
    auth,
    params,
    headers: { ...headers, Authorization: `Bearer ${token}` },
  };

  try {
    yield put(loading.actions.updated({ value: true, id }));
    response = yield call(services.fetch, parameters);
    yield put(loading.actions.updated({ value: false, id }));

    if (!response?.success)
      yield onResponseError({
        error: response?.errors,
        errorCode: response?.errorCode,
        id,
      });

    return { data: response };
  } catch (error) {
    yield onApiCallError({ id });
    return { data: { success: false } };
  }
}
