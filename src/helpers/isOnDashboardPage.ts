export default function isOnDashboardPage(path) {
  const splitPath = path.split("/");
  return splitPath.length > 1 && splitPath[1] == "recipes";
}
