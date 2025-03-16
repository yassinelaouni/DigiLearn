import types from "../../actionsTypes";

export default function tokenSet({ token }) {
  return { type: types.tokenSet, payload: { token } };
}
