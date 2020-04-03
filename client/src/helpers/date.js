export function getFormattedTime(dateString) {
  const dateObj = new Date(dateString);
  return (
    dateObj.getDate() +
    '/' +
    (dateObj.getMonth() + 1) +
    '/' +
    dateObj.getFullYear() +
    ' @ ' +
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes() +
    ':' +
    dateObj.getSeconds()
  );
}
