import types from "../../actionsTypes";

export default function userSet({ user }) {
  return { type: types.userSet, payload: { user } };
}
