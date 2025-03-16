import isArray from "./is-array";

export default function isEmptyArray(array = []){
    if (!isArray(array)) return true

    return array.length === 0
}