import types from "../../actionsTypes";

export default function checkEmail({ email, meta = {} }) {
  return {
    type: types.checkEmail,
    payload: { email },
    meta: { id: types.checkEmail, ...meta },
  };
}
