import types from "../../actionsTypes";

export default function websiteAdded({
    merchantId,
    website,
}) {
    return {
        type: types.websiteAdded,
        payload: {
            merchantId,
            website
        },
    };
}
