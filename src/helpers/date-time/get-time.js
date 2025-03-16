import moment from "moment";

export default function getTime(date) {
  return moment(date).format("LT");
}
