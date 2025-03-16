import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* addWebsiteWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "POST",
            url: `/api/merchants/website/add`,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: "websiteAdded" }));
            yield put(
                actions.websiteAdded({
                    merchantId: response?.data?.added?.merchantId,
                    website: response?.data?.added?.website,// have id , url and status
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
        } else {
            yield put(
                errors.actions.updated({
                    isSuccess: false,
                    show: true,
                    message:
                        response?.data?.added?.errorMessage ?? "An internal error occurred",
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