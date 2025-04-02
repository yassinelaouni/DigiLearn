import { memoize } from "proxy-memoize";
import selectAll from "../all";
import helpers from "helpers";

const manyByUsername = memoize(({ state, username }) => {
    const buyers = selectAll(state);

    let result = [];

    if (helpers.validator.isEmptyString(username)) return null;
    if (!helpers.validator.isObject(buyers)) return null;
    if (helpers.validator.isEmptyObject(buyers)) return null;

    Object.entries(buyers).forEach(([_, client]) => {
        if (client?.username?.includes(username))
            result.push({
                profile: client.profile ?? null,
                name: `${client?.firstName} ${client?.lastName}`,
                id: client?.id,
            });
    });

    return result.length === 0 ? null : result;
});

export default manyByUsername;