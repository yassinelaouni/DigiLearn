import types from "../../actionsTypes";

export default function websiteDeleted({
    merchantId,
    websiteId,
}) {
    return {
        type: types.websiteDeleted,
        payload: {
            merchantId,
            websiteId,
        },
    };
}