import {modalSellFormElement} from './modal-sell.js';
import {carrentBuyer} from './modal-sell.js';

const DIGITS = 2;
const paymentElement = modalSellFormElement.querySelector('#sellPayment');
const pointsElement = modalSellFormElement.querySelector('#sellPoints');
const exchangeRateElement = modalSellFormElement.querySelector('#sellExchangeRate');
const btnChangeAllCarrencyElement = modalSellFormElement.querySelector('#changeCarrency');
const btnChangeAllMoneyElement = modalSellFormElement.querySelector('#changeMoney');

const onbtnChangeAllCarrencyClick = () => {
  const userBalanceElement = document.querySelector('#userCryptoBalance');
  paymentElement.value = userBalanceElement.textContent;
  pointsElement.value = (paymentElement.value * exchangeRateElement.textContent).toFixed(DIGITS);
};
const onbtnChangeAllMoneyClick = () => {
  pointsElement.value = carrentBuyer.buyer.balance.amount;
  paymentElement.value = (pointsElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
};
const fillBuyForm = () => {
  paymentElement.addEventListener('input', () => {
    pointsElement.value = (paymentElement.value * exchangeRateElement.textContent).toFixed(DIGITS);
  });
  pointsElement.addEventListener('input', () => {
    paymentElement.value = (pointsElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
  });
};
fillBuyForm();
btnChangeAllCarrencyElement.addEventListener ('click', onbtnChangeAllCarrencyClick);
btnChangeAllMoneyElement.addEventListener ('click', onbtnChangeAllMoneyClick);
