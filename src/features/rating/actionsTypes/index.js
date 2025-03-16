const RATING = "rating ::: ";

export default Object.freeze({
  // for saga
  getOne: `${RATING}getOne`,
  addOne: `${RATING}addOne`,

  // for reducer
  merged: `${RATING}merged`,
  updated: `${RATING}updated`,
  selectedSet: `${RATING}selectedSet`,
});
