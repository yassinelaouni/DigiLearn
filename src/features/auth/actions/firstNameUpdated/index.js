import types from "../../actionsTypes";

export default function firstNameUpdated({
    userId,
    firstName,
}) {
    return {
        type: types.firstNameUpdated,
        payload: {
            userId,
            firstName
        },
    };
}
