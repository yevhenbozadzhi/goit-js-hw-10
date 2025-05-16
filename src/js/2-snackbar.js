
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });


  promise
    .then((fulfilledDelay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${fulfilledDelay}ms`,
        position: 'topRight',
      });

    })
    .catch((rejectedDelay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: 'topRight',
      });

    });
});
