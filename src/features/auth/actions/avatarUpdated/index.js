import types from "../../actionsTypes";

export default function avatarUpdated({
    userId,
    avatar,
}) {
    return {
        type: types.avatarUpdated,
        payload: {
            userId,
            avatar
        },
    };
}
