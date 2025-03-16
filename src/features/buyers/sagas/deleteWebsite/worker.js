import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* deleteWebsiteWorker({ payload, meta = {} }) {
    let response = {};
    const merchantId = payload.merchantId
    const websiteId = payload.websiteId
    try {
        response = yield call(helpers.sagas.worker, {
            method: "DELETE",
            url: `/api/merchants/website/delete`,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: meta.id }));
            yield put(
                actions.websiteDeleted({
                    merchantId: response?.data?.deleted?.merchantId,
                    websiteId: response?.data?.deleted?.websiteId,
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