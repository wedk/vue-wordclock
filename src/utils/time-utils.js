export function formatTime(date) {
  const hrs = ('' + date.getHours()).padStart(2, '0');
  const min = ('' + date.getMinutes()).padStart(2, '0');
  const sec = ('' + date.getSeconds()).padStart(2, '0');
  return `${hrs}:${min}:${sec}`;
}
