import types from "../../actionsTypes";

export default function changeFirstName({
    userId='1',
    firstName='Doe',
    meta = {}
}= {}) {
    return {
        type: types.changeFirstName,
        payload: {
            userId,
            firstName
        },
        meta: { id: types.changeFirstName, ...meta },
    };
} 