const isName = (name) =>
  name !== null && name !== undefined && /[A-Za-z]{2,50}/.test(name);

export default isName;
