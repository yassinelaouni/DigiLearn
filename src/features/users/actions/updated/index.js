import types from "../../actionsTypes";

export default function updated({ user }) {
  return { type: types.updated, payload: { user } };
}
