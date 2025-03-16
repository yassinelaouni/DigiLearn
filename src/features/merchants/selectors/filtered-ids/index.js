import { memoize } from "proxy-memoize";
import selectAll from "../all";

export default memoize((state) => {
    let result = [];

    const all = selectAll(state);

    Object.entries(all).forEach(([key, _]) => {
        result.push(key);
    });

    return result;
});