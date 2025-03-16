import moment from "moment";

export default function getDate(date) {
  return moment(date).format("YYYY-MM-DD");
}
