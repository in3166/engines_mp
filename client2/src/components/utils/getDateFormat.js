export default function getDateFormat(date) {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;

  let currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;

  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (currentDate < 10) currentDate = `0${currentDate}`;
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;

  return `${date.getFullYear()}-${monthString}-${dateString} ${hour}:${min}:${sec}`;
}
