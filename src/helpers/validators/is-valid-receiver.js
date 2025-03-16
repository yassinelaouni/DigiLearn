import isEmptyString from "../validators/is-empty-string";
import isEmptyObject from "../validators/is-empty-object";
import isObject from "../validators/is-object";

export default function isValidReceiver(receiver) {
  if (!isObject(receiver)) return false;
  if (isEmptyObject(receiver)) return false;
  if (isEmptyString(receiver.creatorId) || isEmptyString(receiver.id))
    return false;
  if (
    isEmptyString(receiver.userId) &&
    (isEmptyString(receiver.firstName) || isEmptyString(receiver.lastName))
  )
    return false;

  return true;
}
