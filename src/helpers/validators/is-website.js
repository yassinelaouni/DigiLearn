import validator from "validator";

export default function isWebsite(website) {
  if (website === null) return false;

  return validator.isURL(website);
}
