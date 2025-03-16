import { memoize } from "proxy-memoize";


export default memoize((state) => {
    // if (state?.merchant?.selected === null) return Cookies.get('selectedId')
    return state?.buyer?.selected
});
