import types from "../../actionsTypes";

export default function removed({ paymentId }) {
  return {
    type: types.removed,
    payload: { paymentId },
  };
}
