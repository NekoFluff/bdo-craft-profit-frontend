export default function numberWithCommas(x) {
  if (x == null) return "NaN";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
