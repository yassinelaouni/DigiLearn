import { memoize } from "proxy-memoize";
import selectAll from "../all";

export default memoize(({ state, id }) => {
  const all = selectAll(state);

  if (all && all.hasOwnProperty(id)) {
    return all[id];
  } else {
    return {};
  }
});
