import types from "../../actionsTypes";

export default function login({ email, password, meta = {} }) {
  return {
    type: types.login,
    payload: {
      email,
      password
    },
    meta: { id: types.login, ...meta },
  };
}
