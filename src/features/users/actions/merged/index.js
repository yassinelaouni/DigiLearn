import types from "../../actionsTypes";

export default function merged({ users }) {
  return { type: types.merged, payload: { users } };
}
