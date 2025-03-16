import types from "../../actionsTypes";

export default function websiteUpdated({
    merchantId,
    website,// have id , url and status
}) {
    return {
        type: types.websiteUpdated,
        payload: {
            merchantId,
            website
        },
    };
}
