
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const timer = document.querySelector("#datetime-picker");
console.log(timer);
const calendar = document.querySelector(".timer")
const btn = document.querySelector("[data-start]");
const daysL = document.querySelector("[data-days]");
const hoursL = document.querySelector("[data-hours]");
const minutesL  = document.querySelector("[data-minutes]");
const secondsL = document.querySelector("[data-seconds]");

let userDate = 0;
btn.setAttribute("disabled", "");
btn.addEventListener("click", startTimer);
function startTimer() {
  btn.setAttribute("disabled", "");
  timer.setAttribute("disabled", "");


  const interval = setInterval(() => {
  const timeNow = Date.now();
  const deltaTime = userDate - timeNow;
  if (deltaTime <= 0) {
    clearInterval(interval);
    return;
  };
    console.log(deltaTime);
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysL.textContent = addLeadingZero(days);
    hoursL.textContent = addLeadingZero(hours);
    minutesL.textContent = addLeadingZero(minutes);
    secondsL.textContent = addLeadingZero(seconds);
}, 1000);
};
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}





const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      btn.setAttribute("disabled", "");
      iziToast.error({
        message: "Please choose a date in the future"
      });
    }
    else {
      btn.removeAttribute("disabled", "");
      userDate = selectedDates[0];
    };
  },
};


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





flatpickr(timer, options);
