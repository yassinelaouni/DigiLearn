import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* changeApiKeyWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "POST",
            url: config.merchant.changeApiKey,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: response.data.id }));
            yield put(
                actions.updated({
                    merchant: response.data.merchant,
                    meta
                })
            );
            yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
        }
    } catch (error) {
        yield put(
            errors.actions.updated({
                isSuccess: false,
                show: true,
                message:
                    response?.data?.errorMessage ?? "An internal error occurred",
                id: meta.id,
            })
        );
    }
}