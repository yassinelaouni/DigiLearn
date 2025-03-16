import types from "../../actionsTypes";

export default function changeStatus({
    merchantId,
    status,
    meta = {}
}) {
    return {
        type: types.changeStatus,
        payload: {
            merchantId,
            status
        },
        meta: { id: types.changeStatus, ...meta },
    };
}