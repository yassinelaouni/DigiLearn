import types from "../../actionsTypes";

export default function updated({ rating }) {
  return { type: types.updated, payload: { rating } };
}
