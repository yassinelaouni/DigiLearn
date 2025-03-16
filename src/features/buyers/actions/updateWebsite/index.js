import types from "../../actionsTypes";

export default function updateWebsite({
    websiteId,
    merchantId,
    url,
    meta = {}
}) {
    return {
        type: types.updateWebsite,
        payload: {
            websiteId,
            merchantId,
            url
        },
        meta: { id: types.updateWebsite, ...meta },
    };
}