const AUTH = "auth ::: ";

export default Object.freeze({
  // for saga
  login: `${AUTH}login`,
  register: `${AUTH}register`,
  checkEmail: `${AUTH}checkEmail`,
  verifyEmail: `${AUTH}verifyEmail`,
  resendCode: `${AUTH}verifyCode`,
  checkCode: `${AUTH}checkCode`,
  resetPassword: `${AUTH}resetPassword`,
  logout: `${AUTH}logout`,
  setup: `${AUTH}setup`,

  // for reducer
  tokenSet: `${AUTH}tokenSet`,
  userSet: `${AUTH}userSet`,
});
