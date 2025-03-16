import types from "../actions-types";

const initState = {
  value: false,
  id: null,
};

const loadingReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.updated:
      return Object.assign({}, state, { isLoading: payload });
    default:
      return state;
  }
};

export default loadingReducer;
