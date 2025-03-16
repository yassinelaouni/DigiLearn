import types from "../../actionsTypes";

export default function statusUpdated({
    paymentId,
    status,
}) {
    return {
        type: types.statusUpdated,
        payload: {
            paymentId,
            status
        },
    };
}
