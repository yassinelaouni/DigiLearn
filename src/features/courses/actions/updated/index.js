import types from "../../actionsTypes";

export default function updated({ one }) {
  return { type: types.updated, payload: { one } };
}
