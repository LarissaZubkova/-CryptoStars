import {modalBuyFormElement} from './modal-buy.js';
import {sendData} from './api.js';

const DIGITS = 2;
const paymentElement = modalBuyFormElement.querySelector('#buyPayment');
const pointsElement = modalBuyFormElement.querySelector('#buyPoints');
const exchangeRateElement = modalBuyFormElement.querySelector('#buyExchangeRate');
const transactionLimitElement = modalBuyFormElement.querySelector('#transaction__limit');

// const pristineForBuy = new Pristine(modalBuyFormElement, {
//   classTo: 'custom-input__label',
//   errorClass: 'custom-input__error',
//   errorTextParent: 'custom-input__label',
// });


// const validatePayment = () => {
//   const limits = Number(transactionLimitElement.textContent.split(' '));
//   const isValidMin = paymentElement.value >= limits[0];
//   const isValidMax = paymentElement.value <= limits[2];

//   return (isValidMin && isValidMax);
// };

// pristineForBuy.addValidator(paymentElement, validatePayment, 'no'/*, validatePaymentMassege*/);
// pristineForBuy.validate();

const onChangeAllBtnElementClick = () => {
  const userBalanceElement = document.querySelector('#user-fiat-balance');
  paymentElement.value = userBalanceElement.textContent;
  pointsElement.value = (paymentElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
};

const fillBuyForm = () => {
  const changeAllBtnElement = modalBuyFormElement.querySelector('.btn--textblue');

  paymentElement.addEventListener('input', () => {
    pointsElement.value = (paymentElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
  });
  pointsElement.addEventListener('input', () => {
    paymentElement.value = (pointsElement.value * exchangeRateElement.textContent).toFixed(DIGITS);
  });
  changeAllBtnElement.addEventListener('click', onChangeAllBtnElementClick);
};
fillBuyForm();

const setUserFormSubmit = (onSuccess) => {
  modalBuyFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // const isValid = pristine.validate();
    // if (isValid) {
    sendData(
      () => onSuccess(),
      () => console.log('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  //}
  });
};

export {setUserFormSubmit};
