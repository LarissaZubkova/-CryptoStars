import {modalSellFormElement, modalBuyFormElement} from './modal-window.js';
const DIGITS = 2;
const paymentElement = modalBuyFormElement.querySelector('#payment');
const pointsElement = modalBuyFormElement.querySelector('#points');
const exchangeRateElement = modalBuyFormElement.querySelector('#transaction__exchange-rate');
const transactionLimitElement = modalBuyFormElement.querySelector('#transaction__limit');
const exampleErrorElement = modalBuyFormElement.querySelector('#example-error');

exampleErrorElement.setAttribute('style', 'display: none');

const pristineForBuy = new Pristine(modalBuyFormElement, {
  classTo: 'custom-input',
  errorTextClass: 'custom-input__error',
  errorTextParent: 'custom-input',
});

const validatePayment = () => {
  const limits = Number(transactionLimitElement.textContent.split(' '));
  const isValidMin = paymentElement.value >= limits[0];
  const isValidMax = paymentElement.value <= limits[2];

  return (isValidMin && isValidMax);
};
console.log(validatePayment());

pristineForBuy.addValidator(paymentElement, validatePayment, 'no'/*, validatePaymentMassege*/);
pristineForBuy.validate();

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
  pristineForBuy.addValidator(paymentElement, validatePayment, 'no'/*, validatePaymentMassege*/);
};
fillBuyForm();
modalBuyFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristineForBuy.validate();
  if (isValid) {
    console.log('good');
  } else {
    console.log('no');
  }
});
