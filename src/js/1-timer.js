import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import iconError from '../img/icon-error.png';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const fieldDays = document.querySelector('span[data-days]');
const fieldHours = document.querySelector('span[data-hours]');
const fieldMinutes = document.querySelector('span[data-minutes]');
const fieldSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() > Date.now()) {
        userSelectedDate = selectedDates[0].getTime();
        button.disabled = false;
        button.dataset.start = 'active';
      } else {
        iziToast.error({
          iconUrl: iconError,
          message: 'Please choose a date in the future',
          position: 'topCenter',
          backgroundColor: '#ef4040',
          titleColor: '#FFFFFF',
          messageColor: '#FFFFFF',
          theme: 'dark',
        });
        button.disabled = true;
        button.dataset.start = '';
      }
    },
  }

const fp = flatpickr(input, options);

input.addEventListener('click', () => {
  fp.open();
})

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function timer({days, hours, minutes, seconds}) {
  fieldDays.textContent = addLeadingZero(days);
  fieldHours.textContent = addLeadingZero(hours);
  fieldMinutes.textContent = addLeadingZero(minutes);
  fieldSeconds.textContent = addLeadingZero(seconds);
}

button.addEventListener('click', () => {
  input.disabled = true;
  button.disabled = true;
  button.dataset.start = '';

  const idTimer = setInterval(() =>{
    const timerValue = userSelectedDate - Date.now();
    if (timerValue >= 0) {
      timer(convertMs(timerValue));
    } else {
      clearInterval(idTimer);
      input.disabled = false;
    }
  },1000)
})