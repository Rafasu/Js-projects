import {isWeekend, getDayName} from "./date-helpers.js";

const calendar = document.querySelector('#calendar-container');

for(let day = 1; day <= 31; day++){
  let divName = "";
  if(day <= 7){
    const dayName = getDayName(day);
    divName = `<div class="name">${dayName}</div>`;
  }
  
  const weekend = isWeekend(day);

  calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend":""}">
  ${divName}
  ${day}
  </div>`);
}

document.querySelectorAll('#calendar-container .day').forEach(day =>{
  day.addEventListener('click', event =>{
    event.currentTarget.classList.toggle("selected");
  })
})
