import validator from "validator";

export default function isPassword(password) {
  if (password === null) return false;
  return validator.isStrongPassword(password);
}
