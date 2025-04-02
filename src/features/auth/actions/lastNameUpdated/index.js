import types from "../../actionsTypes";

export default function lastNameUpdated({
    userId,
    lastName,
}) {
    return {
        type: types.lastNameUpdated,
        payload: {
            userId,
            lastName
        },
    };
}
