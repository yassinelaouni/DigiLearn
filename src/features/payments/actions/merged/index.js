import types from "../../actionsTypes";

export default function merged({ many }) {
  return { type: types.merged, payload: { many } };
}
