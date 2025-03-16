import types from "../../actionsTypes";

export default function statusUpdated({
    merchantId,
    status,
}) {
    return {
        type: types.statusUpdated,
        payload: {
            merchantId,
            status
        },
    };
}
