import { put, call } from "redux-saga/effects";

import errors from "store/errors";
import actions from "../../actions";
import helpers from "helpers";
import config from "../../../../config.json";

export default function* resetPasswordWorker({ payload, meta = {} }) {
    let { data } = yield helpers.sagas.worker({
        method: "POST",
        url: "api/merchants/resetPassword",
        data: payload,
        loadingId: meta.id,
    });

    if (data?.success) {
        // if (data.token && data.user) {
        //     let tokenParams = { key: config.tokenPersistKey, value: data.token };
        //     let userParams = {
        //         key: config.userPersistKey,
        //         value: JSON.stringify(
        //             helpers.parser.userProfilePhoto({ user: data.user })
        //         ),
        //     };

        yield put(actions.tokenSet({ token: data.token }));
        yield put(actions.userSet({ user: data.user }));

        // yield call(helpers.persister.set, tokenParams);
        // yield call(helpers.persister.set, userParams);
        // }

        yield put(errors.actions.updated({ isSuccess: true, id: meta.id }));
    }
}