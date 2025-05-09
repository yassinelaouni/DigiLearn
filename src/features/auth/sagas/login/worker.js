import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import usersActions from "../../../../features/users/actions"
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* loginWorker({ payload, meta = {} }) {
    let response = {};
    const { isAdmin } = meta
    const url = isAdmin ? "http://localhost:5000/api/users/admin/login" : "http://localhost:5000/api/users/login"

    const errorResponse = {
        isSuccess: false,
        show: true,
        message:
            response?.data?.errorMessage ?? "An internal error occurred login",
        id: meta.id
    } 

    try {
        response = yield call(helpers.sagas.worker, {
            method: "POST",
            url,
            data: payload,
            loadingId: meta.id,
        });
        if (response?.data?.success) {
            yield put(
                actions.userSet({
                    user: response?.data?.user
                })
            );
            yield put(
                usersActions.merged({
                    users: response?.data?.user,
                    meta,
                })
            );
            yield put(
                actions.tokenSet({
                    token: response?.data?.token
                })
            );
            yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
        } else {
            yield put(errors.actions.updated(errorResponse));
        }
    } catch (error) {
        yield put(errors.actions.updated(errorResponse));
    }
}