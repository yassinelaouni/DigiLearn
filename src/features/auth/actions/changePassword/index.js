import types from "../../actionsTypes";

export default function updatePassword({
    userId,
    password,
    meta = {}
}) {
    return {
        type: types.changePassword,
        payload: {
            userId,
            password
        },
        meta: { id: types.changePassword, ...meta },
    };
}