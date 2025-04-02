import types from "../../actionsTypes";

export default function deleted({ user }) {
  return { type: types.deleted, payload: { user } };
}
