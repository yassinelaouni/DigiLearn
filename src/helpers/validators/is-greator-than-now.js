import getDateTime from "../date-time/get-date-time";

export default function isGreatorThanNow({ time, date }) {
  if (!date || !time) return true;

  let newFullDate = getDateTime({ date, time });

  return newFullDate > new Date(Date.now());
}
