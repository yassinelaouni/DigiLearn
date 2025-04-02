import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* changeLastNameWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "PATCH",
            url: `/api/users/update/lastName`,
            data: payload,
            loadingId: meta.id,
        });

        if (response?.data?.success) {
            yield put(
                actions.lastNameUpdated({
                    userId: response?.data?.updated?.userId,
                    lastName: response?.data?.updated?.lastName,
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