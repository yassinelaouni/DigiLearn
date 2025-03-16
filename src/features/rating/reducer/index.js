import types from "../actionsTypes";
import { produce } from "immer";
import helpers from "../../../helpers";

const initState = {
  ratings: {},
  selected: null,
};

const ratingReducer = (state = initState, action) => {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case types.merged:
        if (
          helpers.validator.isObject(payload?.ratings) &&
          !helpers.validator.isEmptyObject(payload?.ratings)
        )
          Object.entries(payload.ratings).forEach(([id, rating]) => {
            if (
              !helpers.validator.isEmptyObject(rating) &&
              !helpers.validator.isEmptyString(id)
            )
              draft.ratings[id] = rating;
          });
        break;

      case types.updated:
        if (
          helpers.validator.isObject(payload?.rating) &&
          !helpers.validator.isEmptyObject(payload?.rating) &&
          !helpers.validator.isEmptyString(payload?.rating?.id)
        )
          draft.ratings[payload.rating.id] = payload.rating;
        break;

      case types.selectedSet:
        draft.selected = payload?.id;
        break;

      default:
        break;
    }
  });
};

export default ratingReducer;
