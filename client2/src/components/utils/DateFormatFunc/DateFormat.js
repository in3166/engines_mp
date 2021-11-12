export default function DateFormat(date) {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  console.log('dateString: ', dateString);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  //   console.log('dateString: ', date.getHours());
  //   console.log('dateString: ', date.getMinutes());
  //   console.log('dateString: ', date.getSeconds());

  return `${date.getFullYear()}-${monthString}-${currentDate} ${hour}:${min}:${sec}`;
}
