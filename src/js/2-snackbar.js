import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(e.target.elements.delay.value);
  const state = e.target.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        titleColor: 'white',
        backgroundColor: '#58d68e',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'white',
        titleColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    });
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  return promise;
}
