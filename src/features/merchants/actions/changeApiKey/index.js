import types from "../../actionsTypes";

export default function changeApiKey({
    merchantId,
    ApiKey,
    meta = {}
}) {
    return {
        type: types.changeApiKey,
        payload: {
            merchantId,
            ApiKey
        },
        meta: { id: types.changeApiKey, ...meta },
    };
}