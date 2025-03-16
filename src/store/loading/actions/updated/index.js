import types from "../../actions-types";

export default function updated({ value, id }) {
  return {
    type: types.updated,
    payload: { value, id },
  };
}
