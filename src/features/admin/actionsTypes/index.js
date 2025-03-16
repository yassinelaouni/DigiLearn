const AUTH = "auth ::: ";

export default Object.freeze({
  // for saga
  login: `${AUTH}login`,
  checkEmail: `${AUTH}check-email`,
  checkCode: `${AUTH}check-code`,
  resetPassword: `${AUTH}reset-password`,
  logout: `${AUTH}logout`,
  setup: `${AUTH}setup`,

  // for reducer
  tokenSet: `${AUTH}token/set`,
  userSet: `${AUTH}user/set`,
});
