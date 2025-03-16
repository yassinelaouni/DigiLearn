import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* updateWebsiteWorker({ payload, meta = {} }) {
    let response = {};
    const websiteId = payload.websiteId
    const merchantId = payload.merchantId
    const url = payload.url
    try {
        response = yield call(helpers.sagas.worker, {
            method: "PATCH",
            url: `/api/merchants/website/update`,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: meta.id }));
            yield put(
                actions.websiteUpdated({
                    merchantId: response?.data?.updated?.merchantId,
                    website: response?.data?.updated?.website,// have id , url and status
                    meta
                })
            );
            yield put(
                errors.actions.updated({
                    isSuccess: true,
                    show: true,
                    message:
                        response?.data?.errorMessage,
                    id: meta.id,
                })
            );
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