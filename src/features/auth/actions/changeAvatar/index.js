import types from "../../actionsTypes";

export default function changeAvatar({
    userId='1',
    avatar=null,
    meta = {}
}= {}) {
    return {
        type: types.changeAvatar,
        payload: {
            userId,
            avatar
        },
        meta: { id: types.changeAvatar, ...meta },
    };
}