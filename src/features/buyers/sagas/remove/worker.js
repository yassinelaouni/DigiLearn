import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* remove({ payload, meta = {} }) {
    let response = {};
    const id = payload.merchantId
    try {
        response = yield call(helpers.sagas.worker, {
            method: "DELETE",
            url: `/api/merchants/delete`,
            data: payload,
            loadingId: meta.id,
        });
        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: meta.id }));
            yield put(
                actions.deleted({
                    merchant: response?.data?.deleted,
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