import { memoize } from "proxy-memoize";
import selectAll from "../all";

export default memoize((state) => {

    const merchantConnected = selectAll(state);

    return merchantConnected ?? {};
});