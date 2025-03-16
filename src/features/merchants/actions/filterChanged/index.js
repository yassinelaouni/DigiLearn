import types from "../../actionsTypes";

export default function filterChanged({
    filter// addedAfter, addedBefore, balanceBelow,
    //balanceCont, apiKey, limit, page
}) {
    return {
        type: types.filterChanged,
        payload: {
            filter
        },
    };
}
