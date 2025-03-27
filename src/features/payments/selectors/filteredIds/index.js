import { memoize } from "proxy-memoize";
import selectAll from "../all";
import helpers from '../../../../helpers'

export default memoize((state) => {
  let result = [];
  const all = selectAll(state);

  Object.entries(all).forEach(([key, payment]) => {
    if (helpers.getStatus(payment.status) !== "deleted") {
      result.push(key);
    }
  });

  return result;
});
