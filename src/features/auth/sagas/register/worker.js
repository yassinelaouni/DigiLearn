import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* registerWorker({ payload, meta = {} }) {
    let response = {};
    try {
        response = yield call(helpers.sagas.worker, {
            method: "POST",
            url: `http://localhost:5000/api/users/register`,
            data: payload,
            loadingId: meta.id,
        });
        if (response?.data?.success) {
            // yield put(actions.selectedSet({ id: meta.id }));
            // console.log("id : ", meta.id)
            yield put(
                actions.userSet({
                    user: response?.data?.user
                })
            );
            yield put(
                actions.tokenSet({
                    token: response?.data?.token
                })
            );
            yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
        } else {
            yield put(
                errors.actions.updated({
                    isSuccess: false,
                    show: true,
                    message:
                        response?.data?.added?.errorMessage ?? "An internal error occurred login",
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