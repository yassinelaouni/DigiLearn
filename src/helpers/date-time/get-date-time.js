export default function getDateTime({ time, date }) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const h = time.getHours();
  const mi = time.getMinutes();

  const result = new Date(y, m, d, h, mi);
  // console.log(date);
  // console.log(y);
  // console.log(m);
  // console.log(d);

  // console.log(time);
  // console.log(h);
  // console.log(mi);

  // console.log(result);

  return result;
}
