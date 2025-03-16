import types from "../../actionsTypes";

export default function verifyEmail({ code, meta = {} }) {
  return {
    type: types.verifyEmail,
    payload: { code },
    meta: { id: types.verifyEmail, ...meta },
  };
}
