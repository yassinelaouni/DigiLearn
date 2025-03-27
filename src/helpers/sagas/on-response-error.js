import { put } from "redux-saga/effects";
import errors from "../../store/errors";
import features from "../../features";
import config from "../../config.json";
import prepareProdErrors from "../prepare-prod-errors";

export default function* onResponseError({ error, errorCode, id }) {
  let result = { isSuccess: false, id };

  if (errorCode) {
    if (errorCode === "I0001")
      yield put(features.auth.actions.logout()); // I0001: unauthorized
    else {
      result["message"] = config.errors[errorCode];
      result["show"] = true;
    }
  } else {
    let parsedErrorCode = prepareProdErrors(error);

    if (parsedErrorCode) {
      result["message"] = config.errors[parsedErrorCode];
      result["show"] = true;
    }
  }

  yield put(errors.actions.updated({ ...result }));
}
