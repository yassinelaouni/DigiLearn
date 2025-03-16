import types from "../../actionsTypes";

export default function remove({
    merchantId,
    meta = {}
}) {
    return {
        type: types.remove,
        payload: {
            merchantId
        },
        meta: { id: types.remove, ...meta },
    };
}