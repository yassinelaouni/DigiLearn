import { memoize } from "proxy-memoize";
import selectSelected from "../selected";
import selectOneById from "../oneById";

const detailedSelected = memoize((state) => {
    const selectedId = selectSelected(state)
    return selectOneById({ state, id: selectedId });
});

export default detailedSelected;