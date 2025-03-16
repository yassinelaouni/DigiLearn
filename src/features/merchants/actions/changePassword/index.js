import types from "../../actionsTypes";

export default function updatePassword({
    merchantId,
    password,
    meta = {}
}) {
    return {
        type: types.changePassword,
        payload: {
            merchantId,
            password
        },
        meta: { id: types.changePassword, ...meta },
    };
}