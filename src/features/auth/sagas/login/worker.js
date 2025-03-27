import { put, call } from "redux-saga/effects";
import actions from "../../actions";
import merchantsActions from "../../../../features/merchants/actions"
import errors from "../../../../store/errors";
import helpers from "../../../../helpers";
import config from "../../../../config.json";

export default function* loginWorker({ payload, meta = {} }) {
    let response = {};
    const { isAdmin } = meta
    const url = isAdmin ? "api/merchants/admin/login" : "api/merchants/login"

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
                merchantsActions.merged({
                    merchants: response?.data?.user,
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