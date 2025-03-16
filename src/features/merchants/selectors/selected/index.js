import { memoize } from "proxy-memoize";
import Cookies from 'js-cookie';

export default memoize((state) => {
    if (state?.merchant?.selected === null) return Cookies.get('selectedId')
    return state?.merchant?.selected
});
