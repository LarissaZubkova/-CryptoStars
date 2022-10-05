import {carrentSeller} from './modal-buy.js';
import {sendData} from './api.js';
import {showBuyErrorMessage} from './messages.js';
import {state} from './user-profile.js';
import {showAlert} from './utils.js';

const DIGITS = 0;
const modalBuyFormElement = document.querySelector('.modal-buy');
const paymentElement = modalBuyFormElement.querySelector('#buyPayment');
const pointsElement = modalBuyFormElement.querySelector('#buyPoints');
const exchangeRateElement = modalBuyFormElement.querySelector('#buyExchangeRate');
const submitButton = modalBuyFormElement.querySelector('.modal__submit');
const changeAllBtnElement = modalBuyFormElement.querySelector('.btn--textblue');
const sellSelectElement = modalBuyFormElement.querySelector('#sellSelect');

const pristineConfig = {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
};

let pristineBuyForm;

const validatePayment = () => {
  const isValidMin = paymentElement.value >= carrentSeller.seller.minAmount;
  const isValidMax = paymentElement.value <= carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate;

  return (isValidMin && isValidMax);
};

const renderValidatePaymentMessage = () => {
  if (paymentElement.value < carrentSeller.seller.minAmount) {
    return `Минимальная сумма ${carrentSeller.seller.minAmount} ₽`;
  }
  if (paymentElement.value > carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate) {
    return `Максимальная сумма ${(carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate).toFixed(DIGITS)} ₽`;
  }
};

const validatePoints = () => {
  const isValidMin = pointsElement.value >= 1;
  const isValidMax = paymentElement.value <= state.offers.balances[1].amount;

  return (isValidMin && isValidMax);
};

const renderValidatePointsMessage = () => {
  if (pointsElement.value < 1) {
    return 'Хотя бы один КЕКС';
  }
  if (pointsElement.value > state.offers.balances[1].amount) {
    return `Максимальная сумма ${state.offers.balances[1].amount} КЕКС`;
  }
};
console.log(sellSelectElement.value);
const validateSelect = () => sellSelectElement.value === 'Выберите платёжную систему';

const onPaymentElementChange = () => {
  pointsElement.value = (paymentElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
  pristineBuyForm.validate(paymentElement);
  pristineBuyForm.validate(pointsElement);
};
const onPointsElementChange = () => {
  paymentElement.value = (pointsElement.value * exchangeRateElement.textContent).toFixed(DIGITS);
  pristineBuyForm.validate(pointsElement);
  pristineBuyForm.validate(paymentElement);
};

const onChangeAllBtnElementClick = () => {
  const userBalanceElement = document.querySelector('#userFiatBalance');
  paymentElement.value = userBalanceElement.textContent;
  pointsElement.value = (paymentElement.value / exchangeRateElement.textContent).toFixed(DIGITS);
  pristineBuyForm.validate(pointsElement);
  pristineBuyForm.validate(paymentElement);
};

const initValidator = () => {
  pristineBuyForm = new Pristine(modalBuyFormElement, pristineConfig);
  pristineBuyForm.addValidator(paymentElement, validatePayment, renderValidatePaymentMessage);
  pristineBuyForm.addValidator(pointsElement, validatePoints, renderValidatePointsMessage);
  pristineBuyForm.addValidator(sellSelectElement, validateSelect, showAlert('Нужно выбрать'));
  paymentElement.addEventListener('input', onPaymentElementChange);
  pointsElement.addEventListener('input', onPointsElementChange);
  changeAllBtnElement.addEventListener('click', onChangeAllBtnElementClick);
};

const resetPristine = () => {
  pristineBuyForm.reset();
  paymentElement.removeEventListener('input', onPaymentElementChange);
  pointsElement.removeEventListener('input', onPointsElementChange);
  changeAllBtnElement.removeEventListener('click', onChangeAllBtnElementClick);
  pristineBuyForm.destroy();
  initValidator();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setUserFormSubmit = (onSuccess) => {
  modalBuyFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristineBuyForm.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showBuyErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, initValidator, resetPristine};
