import types from "../../actionsTypes";

export default function generateApiKey({
    merchantId,
    meta = {}
}) {
    return {
        type: types.generateApiKey,
        payload: {
            merchantId
        },
        meta: { id: types.generateApiKey, ...meta },
    };
}