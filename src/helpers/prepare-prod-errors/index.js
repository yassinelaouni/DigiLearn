import validator from "../validators";

export default function prepareProdErrors(errors) {
  let result = null;
  let found = false;

  if (!validator.isObject(errors || validator.isEmptyObject(errors)))
    return null;

  Object.entries(errors).forEach(([_, error]) => {
    if (!found)
      if (error.errorCode) {
        result = error.errorCode;
        found = true;
      }
  });

  return result;
}
