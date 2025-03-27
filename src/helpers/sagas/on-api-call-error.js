import { put } from "redux-saga/effects";
import errors from "../../store/errors";
import loading from "../../store/loading";
import config from "../../config.json";

export default function* onApiCallError({ id }) {
  yield put(loading.actions.updated({ value: false, id }));
  yield put(
    errors.actions.updated({
      isSuccess: false,
      message: config.errors["I0000"],
      id,
      statusCode: 500,
      show: true,
    })
  );
}
