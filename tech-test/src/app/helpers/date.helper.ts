export function getFormattedCurrentDate() {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
}
