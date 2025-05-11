import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonStart = document.querySelector('.js-button');
const inputDate = document.querySelector('.js-datetime-picker');

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let userSelectedDate;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      buttonStart.setAttribute('disabled', '');
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        titleColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    } else {
      buttonStart.removeAttribute('disabled');
    }
  },
});

let countdown;

buttonStart.addEventListener('click', e => {
  buttonStart.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');

  startCountdown();
});

function startCountdown() {
  if (!userSelectedDate) return;

  clearInterval(countdown);
  const targetTime = userSelectedDate.getTime();
  let remainingUnixTime = targetTime - Date.now();
  let remainingTime = addLeadingZero(convertMs(remainingUnixTime));

  changeText(remainingTime);

  countdown = setInterval(() => {
    remainingUnixTime = targetTime - Date.now();

    if (remainingUnixTime <= 0) {
      clearInterval(countdown);

      inputDate.removeAttribute('disabled');

      changeText({ days: '00', hours: '00', minutes: '00', seconds: '00' });

      return;
    }

    remainingTime = addLeadingZero(convertMs(remainingUnixTime));
    changeText(remainingTime);
  }, 1000);
}

function changeText(remainingTime) {
  secondsDisplay.textContent = remainingTime.seconds;
  minutesDisplay.textContent = remainingTime.minutes;
  hoursDisplay.textContent = remainingTime.hours;
  daysDisplay.textContent = remainingTime.days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, 0);
  hours = hours.toString().padStart(2, 0);
  minutes = minutes.toString().padStart(2, 0);
  seconds = seconds.toString().padStart(2, 0);

  return { days, hours, minutes, seconds };
}
