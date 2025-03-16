import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* changeWebsiteStatusWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "PATCH",
            url: `/api/merchants/website/update/status`,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(
                actions.statusWebsiteUpdated({
                    merchantId: response?.data?.updated?.merchantId,
                    websiteId: response?.data?.updated?.websiteId,
                    status: response?.data?.updated?.status,
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