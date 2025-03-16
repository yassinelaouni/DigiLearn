import { memoize } from "proxy-memoize";
import selectSelected from "../selected";
import selectDetailedOneById from "../oneById";

const detailedSelected = memoize((state) => {
  const selectedId = selectSelected(state);
  return selectDetailedOneById({ state, id: selectedId }) ?? {};
});

export default detailedSelected;
