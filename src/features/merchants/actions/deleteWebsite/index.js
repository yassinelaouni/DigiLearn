import types from "../../actionsTypes";

export default function deleteWebsite({
    merchantId,
    websiteId,
    meta = {}
}) {
    return {
        type: types.deleteWebsite,
        payload: {
            merchantId,
            websiteId,
        },
        meta: { id: types.deleteWebsite, ...meta },
    };
}
