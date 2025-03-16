import types from "../../actionsTypes";

export default function resetPassword({ email, password, code, meta = {} }) {
  return {
    type: types.resetPassword,
    payload: { email, password, code },
    meta: { id: types.resetPassword, ...meta },

  };
}
