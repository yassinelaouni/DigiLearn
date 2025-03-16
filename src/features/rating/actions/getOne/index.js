import types from "../../actionsTypes";

export default function getOne({ firstName, lastName, phone, clientId, meta = {} }) {
  return {
    type: types.getOne,
    payload: { firstName, lastName, phone, clientId },
    meta: { id: types.getOne, ...meta },
  };
}
