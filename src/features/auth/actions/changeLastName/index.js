import types from "../../actionsTypes";

export default function changeLastName({
    userId='1',
    lastName='Doe',
    meta = {}
}= {}) {
    return {
        type: types.changeLastName,
        payload: {
            userId,
            lastName
        },
        meta: { id: types.changeLastName, ...meta },
    };
} 