const isWeekend  = day => {
  //Saturday's || Sunday's
  return day % 7 === 6 || day % 7 === 0;
}

const getDayName = day =>{
  const date = new Date(2018, 0, day);
  const options = {weekday: "short"};
  const dayName = new Intl.DateTimeFormat("en-US", options).format(date);
  return dayName;
} 

export {isWeekend, getDayName};