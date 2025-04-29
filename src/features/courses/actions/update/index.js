import types from "../../actionsTypes";

export default function update({ meta = {}, ...rest }) {
  return {
    type: types.update,
    payload: { ...rest },
    meta: {id: types.update, ...meta}
  };
}
