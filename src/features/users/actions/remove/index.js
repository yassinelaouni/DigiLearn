import types from "../../actionsTypes";

export default function remove({
    userId,
    meta = {}
}) {
    return {
        type: types.remove,
        payload: {
            userId
        },
        meta: { id: types.remove, ...meta },
    };
}