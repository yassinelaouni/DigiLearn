import types from "../../actionsTypes";

export default function selectedSet({ id }) {
  return { type: types.selectedSet, payload: { id } };
}
