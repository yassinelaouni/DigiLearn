const AUTH = "auth ::: ";

export default Object.freeze({
  // for saga
  login: `${AUTH}login`,
  register: `${AUTH}register`,
  logout: `${AUTH}logout`,
  setup: `${AUTH}setup`,
  changePassword: `${AUTH}change-password`,
  changeFirstName: `${AUTH}change-first-name`,
  changeLastName: `${AUTH}change-last-name`,
  changeAvatar: `${AUTH}change-avatar`,

  // for reducer
  tokenSet: `${AUTH}tokenSet`,
  userSet: `${AUTH}userSet`,
  avatarUpdated: `${AUTH}avatar-updated`,
  filterChanged: `${AUTH}filter-changed`,
  firstNameUpdated: `${AUTH}first-name-updated`,
  lastNameUpdated: `${AUTH}last-name-updated`,
});
