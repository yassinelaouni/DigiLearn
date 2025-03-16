import { memoize } from "proxy-memoize";
import selectSelected from "../selected";
import selectOneById from "../oneById";

const detailedSelected = memoize((state) => {
    const selectedId = selectSelected(state);
    console.log("buyer : ", selectedId)
    return selectOneById({ state, id: selectedId });
});

export default detailedSelected;