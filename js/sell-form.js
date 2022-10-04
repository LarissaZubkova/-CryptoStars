import {modalSellFormElement} from './modal-sell.js';

const DIGITS = 2;
const paymentElement = modalSellFormElement.querySelector('#sellPpayment');
const pointsElement = modalSellFormElement.querySelector('#sellPoints');
const exchangeRateElement = modalSellFormElement.querySelector('#sellExchangeRate');

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
