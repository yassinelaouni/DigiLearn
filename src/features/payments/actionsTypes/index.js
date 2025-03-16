const PAYMENT = "payment ::: ";

export default Object.freeze({
  // for middleware
  remove: `${PAYMENT}remove`,

  // for saga
  getMany: `${PAYMENT}get/many`,
  hardDelete: `${PAYMENT}hard/delete`,
  changeStatus: `${PAYMENT}change/status`,
  update: `${PAYMENT}update`,

  // for reducer
  merged: `${PAYMENT}merged`,
  removed: `${PAYMENT}removed`,
  updated: `${PAYMENT}updated`,
  selectedSet: `${PAYMENT}selected/set`,
  filterUpdated: `${PAYMENT}filter/updated`,
  statusUpdated: `${PAYMENT}status/updated`
});
