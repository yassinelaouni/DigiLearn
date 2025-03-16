import types from "../actions-types";

const initState = {
  isSuccess: false,
  message: "",
  errors: {},
  id: "",
  statusCode: null,
  show: false,
};

const errorsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.cleaned:
      return initState;
    case types.updated:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default errorsReducer;
