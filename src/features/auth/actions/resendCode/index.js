import types from "../../actionsTypes";

export default function resendCode({ meta = {} } = {}) {
  return {
    type: types.resendCode,
    payload: {},
    meta: { id: types.resendCode, ...meta },
  };
}
