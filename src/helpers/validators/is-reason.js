const isReason = (reason) =>
  reason !== null && reason !== undefined && /[A-Za-z1-9]{30,100}/.test(reason);

export default isReason;
