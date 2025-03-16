import types from "../../actionsTypes";

export default function setup({ meta = {} }) {
  return {
    type: types.setup,
    meta,
  };
}
