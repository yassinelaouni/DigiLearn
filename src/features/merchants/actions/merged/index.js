import types from "../../actionsTypes";

export default function merged({ merchants }) {
  return { type: types.merged, payload: { merchants } };
}
