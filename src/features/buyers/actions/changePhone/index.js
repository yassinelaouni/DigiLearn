import types from "../../actionsTypes";

export default function changePhone({
    merchantId,
    phone,
    meta = {}
}) {
    return {
        type: types.changePhone,
        payload: {
            merchantId,
            phone
        },
        meta: { id: types.changePhone, ...meta },
    };
}