import selectors from "../../../selectors";
import { useSelector } from "react-redux";

export default function useSearchResult() {
    const result = useSelector(selectors.detailedSelected);

    return { result };
}