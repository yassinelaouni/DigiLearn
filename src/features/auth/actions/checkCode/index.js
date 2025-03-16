import types from "../../actionsTypes";

export default function checkCode({ code, email, meta = {} }) {
  return {
    type: types.checkCode,
    payload: { code, email },
    meta: { id: types.checkCode, ...meta },
  };
}
