import produce from "immer";
import getInitialState from "../initialState";
import types from "../actionsTypes";
import helpers from "../../../helpers";


const userReducer = (state = getInitialState(), action) => {
    const { type, payload } = action;

    return produce(state, (draft) => {
        switch (type) {
            case types.selectedSet:
                draft.selected = payload?.id;
                break;

            case types.merged:
                if (
                    helpers.validator.isArray(payload?.users) &&
                    !helpers.validator.isEmptyObject(payload?.users)
                ) {
                    payload.users.forEach((user) => {
                        if (
                            !helpers.validator.isEmptyObject(user) &&
                            !helpers.validator.isEmptyString(user.id)
                        ) {
                            draft.all[user.id] = user;
                        }
                    });
                }
                break;

            case types.updated:
                if (
                    helpers.validator.isObject(payload?.user) &&
                    !helpers.validator.isEmptyObject(payload?.user) &&
                    !helpers.validator.isEmptyString(payload?.user?.id)
                ) {
                    draft.all[payload.user.id] = payload.user;
                }
                break;

            case types.filterChanged:
                const { filter } = payload;
                if (
                    helpers.validator.isObject(draft.filter) &&
                    !helpers.validator.isEmptyString(filter)
                ) {
                    draft.filter = filter;
                }
                break;

            case types.deleted:
                if (
                    helpers.validator.isObject(payload?.user) &&
                    !helpers.validator.isEmptyObject(payload?.user) &&
                    !helpers.validator.isEmptyString(payload?.user?.id)
                ) {
                    delete draft.all[payload.user.id];
                }
                break;

            default:
                break;
        }
    });
};

export default userReducer;