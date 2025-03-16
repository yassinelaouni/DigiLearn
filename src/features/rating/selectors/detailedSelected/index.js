import { memoize } from "proxy-memoize";
import selectSelected from "../selected";
import selectOneById from "../oneById";

const detailedSelected = memoize((state) => {
  const selectedId = selectSelected(state);
  const detailedSelected = selectedId === "notFound" ? {} : selectOneById({ state, id: selectedId })
  return detailedSelected;
});

export default detailedSelected;
