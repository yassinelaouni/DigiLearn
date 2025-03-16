import types from "../../actionsTypes";

export default function deleted({ merchant }) {
  return { type: types.deleted, payload: { merchant } };
}
