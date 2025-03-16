import types from "../../actionsTypes";

export default function statusWebsiteUpdated({
    merchantId,
    websiteId,
    status,
}) {
    return {
        type: types.statusWebsiteUpdated,
        payload: {
            merchantId,
            websiteId,
            status
        },
    };
}
