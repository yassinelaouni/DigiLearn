import types from "../../actionsTypes";

export default function addWebsite({
    merchantId,
    url,
    meta = {}
}) {
    return {
        type: types.addWebsite,
        payload: {
            merchantId,
            url
        },
        meta: { id: types.addWebsite, ...meta },
    };
}