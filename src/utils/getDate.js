const getDate = (before) => {
  const date = new Date(before);
  const pdate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
      
  return pdate;
}

export default getDate;