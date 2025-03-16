import validator from "validator";

export default function isMobilePhone(phone) {
  if (phone == null) return false;
  return validator.isMobilePhone(phone, false, { strictMode: true });
}
