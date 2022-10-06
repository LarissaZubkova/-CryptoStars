import {carrentSeller} from './modal-buy.js';
import {sendBuyData} from './api.js';
import {showBuyErrorMessage} from './messages.js';
import {state} from './user-profile.js';

const DIGIT = 2;
const Messages = {
  ERROR_KEKS: 'Хотя бы один КЕКС',
  ERROR_PASSWORD: 'Неверный пароль',
};
const PASSWORD = '180712';
const ButtonName = {
  SAVE: 'Сохраняю...',
  CHANGE: 'Обменять',
};

const modalBuyFormElement = document.querySelector('.modal-buy');
const paymentElement = modalBuyFormElement.querySelector('#buyPayment');
const pointsElement = modalBuyFormElement.querySelector('#buyPoints');
const exchangeRateElement = modalBuyFormElement.querySelector('#buyExchangeRate');
const submitButton = modalBuyFormElement.querySelector('.modal__submit');
const changeAllBtnElement = modalBuyFormElement.querySelector('.btn--textblue');
const passwordElement = modalBuyFormElement.querySelector('[name="paymentPassword"]');

const pristineConfig = {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
};

const pristineBuyForm = {
  pristine: [],
};

const validatePayment = () => {
  const maxAmount = carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate;
  const isValidMin = paymentElement.value >= carrentSeller.seller.minAmount;
  const isValidMax = paymentElement.value <= maxAmount;

  return (isValidMin && isValidMax);
};

const renderValidatePaymentMessage = () => {
  const maxAmount = carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate;
  if (paymentElement.value < carrentSeller.seller.minAmount) {
    return `Минимальная сумма ${carrentSeller.seller.minAmount} ₽`;
  }
  if (paymentElement.value > carrentSeller.seller.balance.amount * carrentSeller.seller.exchangeRate) {
    return `Максимальная сумма ${(maxAmount).toFixed(DIGIT)} ₽`;
  }
};

const validatePoints = () => {
  const isValidMin = pointsElement.value >= 1;
  const isValidMax = pointsElement.value <= carrentSeller.seller.balance.amount;

  return (isValidMin && isValidMax);
};

const renderValidatePointsMessage = () => {
  if (pointsElement.value < 1) {
    return Messages.ERROR_KEKS;
  }
  if (pointsElement.value > state.offers.balances[1].amount) {
    return `Максимальная сумма ${carrentSeller.seller.balance.amount} КЕКС`;
  }
};

const validatePassword = () => passwordElement.value === PASSWORD;

const onPaymentElementChange = () => {
  pointsElement.value = (paymentElement.value / exchangeRateElement.textContent);
  pristineBuyForm.pristine.validate(paymentElement);
  pristineBuyForm.pristine.validate(pointsElement);
};

const onPointsElementChange = () => {
  paymentElement.value = (pointsElement.value * exchangeRateElement.textContent).toFixed(DIGIT);
  pristineBuyForm.pristine.validate(pointsElement);
  pristineBuyForm.pristine.validate(paymentElement);
};

const onChangeAllBtnElementClick = () => {
  const userBalanceElement = document.querySelector('#userFiatBalance');
  paymentElement.value = userBalanceElement.textContent;
  pointsElement.value = (paymentElement.value / exchangeRateElement.textContent);
  pristineBuyForm.pristine.validate(pointsElement);
  pristineBuyForm.pristine.validate(paymentElement);
};

const initValidatorBuyForm = () => {
  pristineBuyForm.pristine = new Pristine(modalBuyFormElement, pristineConfig);
  pristineBuyForm.pristine.addValidator(paymentElement, validatePayment, renderValidatePaymentMessage);
  pristineBuyForm.pristine.addValidator(pointsElement, validatePoints, renderValidatePointsMessage);
  pristineBuyForm.pristine.addValidator(passwordElement, validatePassword, Messages.ERROR_PASSWORD);
  paymentElement.addEventListener('input', onPaymentElementChange);
  pointsElement.addEventListener('input', onPointsElementChange);
  changeAllBtnElement.addEventListener('click', onChangeAllBtnElementClick);
};

const resetPristineBuyForm = () => {
  pristineBuyForm.pristine.reset();
  paymentElement.removeEventListener('input', onPaymentElementChange);
  pointsElement.removeEventListener('input', onPointsElementChange);
  changeAllBtnElement.removeEventListener('click', onChangeAllBtnElementClick);
  pristineBuyForm.pristine.destroy();
  initValidatorBuyForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = ButtonName.SAVE;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = ButtonName.CHANGE;
};

const setBuyFormSubmit = (onSuccess) => {
  modalBuyFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristineBuyForm.pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendBuyData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
          showBuyErrorMessage();
        },
        new FormData(evt.target),
      );
    } else {
      showBuyErrorMessage();
    }
  });
};

export {setBuyFormSubmit, initValidatorBuyForm, resetPristineBuyForm};
