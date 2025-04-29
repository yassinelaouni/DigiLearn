import types from "../../actionsTypes";

export default function remove({ paymentId, meta = {} }) {
  return {
    type: types.remove,
    payload: { paymentId },
    meta: { id: types.remove, ...meta },
  };
}
