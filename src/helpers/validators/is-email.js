import validator from "validator";

export default function isEmail(email) {
  if (email === null) return false;
  return validator.isEmail(email);
}
