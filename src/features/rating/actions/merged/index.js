import types from "../../actionsTypes";

export default function merged({ ratings }) {
  return { type: types.merged, payload: { ratings } };
}
