import types from "../../actionsTypes";

export default function hardDelete({ meta = {} } = {}) {
  return {
    type: types.hardDelete,
    meta: { id: types.hardDelete, ...meta },
  };
}
