import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconOk from '../img/icon-ok.png';
import iconError from '../img/icon-error.png';

const form = document.querySelector('.form');

const startSnack = (event) => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    form.reset();
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (state == 'fulfilled') {
              resolve(delay);  
            };
            if (state == 'rejected') {
              reject(delay); 
            };
        }, delay);
    })
};
 
form.addEventListener('submit', event => {
    startSnack(event)
    .then(value => 
            iziToast.success({
                title: 'OK',
                iconUrl: iconOk,
                message: `Fulfilled promise in ${value}ms`,
                position: 'topCenter',
                backgroundColor: '#59a10d',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )
    .catch(error =>
            iziToast.error({
                iconUrl: iconError,
                message: `Rejected promise in ${error}ms`,
                position: 'topCenter',
                backgroundColor: '#ef4040',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )    
});
