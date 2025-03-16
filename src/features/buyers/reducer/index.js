import produce from "immer";
import getInitialState from "../initialState";
import types from "../actionsTypes";
import helpers from "../../../helpers";


const merchantReducer = (state = getInitialState(), action) => {
    const { type, payload } = action;

    return produce(state, (draft) => {
        switch (type) {
            case types.selectedSet:
                draft.selected = payload?.id;
                break;

            case types.merged:
                if (
                    helpers.validator.isArray(payload?.merchants) &&
                    !helpers.validator.isEmptyObject(payload?.merchants)
                ) {
                    payload.merchants.forEach((merchant) => {
                        if (
                            !helpers.validator.isEmptyObject(merchant) &&
                            !helpers.validator.isEmptyString(merchant.id)
                        ) {
                            draft.all[merchant.id] = merchant;
                        }
                    });
                }
                break;

            case types.updated:
                if (
                    helpers.validator.isObject(payload?.merchant) &&
                    !helpers.validator.isEmptyObject(payload?.merchant) &&
                    !helpers.validator.isEmptyString(payload?.merchant?.id)
                ) {
                    draft.all[payload.merchant.id] = payload.merchant;
                }
                break;

            case types.websiteAdded:
                // console.log("add")
                const { website } = payload;
                if (!helpers.validator.isEmptyString(payload.merchantId)) {
                    draft.all[payload.merchantId].websites.push(website);
                }
                break;

            case types.websiteUpdated:

                if (draft.all[payload.merchantId]) {
                    const websiteIndex = draft.all[payload.merchantId].websites.findIndex(
                        (site) => site.id === payload.website.id
                    );
                    if (websiteIndex !== -1) {
                        draft.all[payload.merchantId].websites[websiteIndex] = payload.website;
                    }
                }
                break;

            case types.websiteDeleted:
                const { websiteId } = payload;
                const merchantToDeleteFrom = draft.all[payload.merchantId]; if (merchantToDeleteFrom && merchantToDeleteFrom.websites) {
                    draft.all[payload.merchantId].websites = draft.all[payload.merchantId].websites.filter(
                        (website) => website.id !== websiteId
                    );
                }
                break;

            case types.phoneUpdated:
                const { phone } = payload;
                if (
                    helpers.validator.isObject(draft.all[payload.merchantId]) &&
                    !helpers.validator.isEmptyString(phone)
                ) {
                    draft.all[payload.merchantId].phone = phone;
                }
                break;

            case types.statusUpdated:
                const { status } = payload;
                if (
                    helpers.validator.isObject(draft.all[payload.merchantId]) &&
                    !helpers.validator.isEmptyString(status)
                ) {
                    draft.all[payload.merchantId].status = status;
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
                    helpers.validator.isObject(payload?.merchant) &&
                    !helpers.validator.isEmptyObject(payload?.merchant) &&
                    !helpers.validator.isEmptyString(payload?.merchant?.id)
                ) {
                    delete draft.all[payload.merchant.id];
                }
                break;

            default:
                break;
        }
    });
};

export default merchantReducer;