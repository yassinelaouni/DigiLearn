import types from "../../actionsTypes";

export default function updated({ merchant }) {
  return { type: types.updated, payload: { merchant } };
}
