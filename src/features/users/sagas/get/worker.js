import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";

export default function* getWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "GET",
            url: "/api/users",
            data: payload,
            loadingId: meta.id,
        });
        if (response?.data?.success) {
            yield put(actions.selectedSet({ id: meta.id }));
            yield put(
                actions.merged({
                    users: response?.data?.found,
                    meta,
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