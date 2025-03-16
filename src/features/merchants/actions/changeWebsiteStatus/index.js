import types from "../../actionsTypes";

export default function changeWebsiteStatus({
    merchantId,
    websiteId,
    status,
    meta = {}
}) {
    return {
        type: types.changeWebsiteStatus,
        payload: {
            merchantId,
            websiteId,
            status
        },
        meta: { id: types.changeWebsiteStatus, ...meta },
    };
}