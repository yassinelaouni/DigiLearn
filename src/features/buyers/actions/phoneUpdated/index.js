import types from "../../actionsTypes";

export default function phoneUpdated({
    merchantId,
    phone,
}) {
    return {
        type: types.phoneUpdated,
        payload: {
            merchantId,
            phone
        },
    };
}
