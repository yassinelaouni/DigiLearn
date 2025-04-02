import { memoize } from "proxy-memoize";
import selectAll from "../all";

export default memoize((state) => {

    const userConnected = selectAll(state);

    return userConnected ?? {};
});