import validator from "validator";

export default function isBirthday(birthday) {
  if (birthday === null) return false;
  return validator.isDate(birthday);
}
