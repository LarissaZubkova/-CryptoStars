import {carrentBuyer} from './modal-sell.js';
import {state} from './user-profile.js';
import {sendSellData} from './api.js';
import {showSellErrorMessage} from './messages.js';

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
const modalSellFormElement = document.querySelector('.modal-sell');
const paymentElement = modalSellFormElement.querySelector('#sellPayment');
const pointsElement = modalSellFormElement.querySelector('#sellPoints');
const exchangeRateElement = modalSellFormElement.querySelector('#sellExchangeRate');
const btnChangeAllCarrencyElement = modalSellFormElement.querySelector('#changeCarrency');
const btnChangeAllMoneyElement = modalSellFormElement.querySelector('#changeMoney');
const passwordElement = modalSellFormElement.querySelector('[name="paymentPassword"]');
const submitButton = modalSellFormElement.querySelector('.modal__submit');

const pristineConfig = {
  classTo: 'custom-input',
  errorClass: 'custom-input__error',
  errorTextParent: 'custom-input',
};

const pristineSellForm = {
  pristine: [],
};

const validatePoints = () => {
  const isValidMin = pointsElement.value >= carrentBuyer.buyer.minAmount;
  const isValidMax = pointsElement.value <= carrentBuyer.buyer.balance.amount;

  return (isValidMin && isValidMax);
};

const renderValidatePointsMessage = () => {
  if (pointsElement.value < carrentBuyer.buyer.minAmount) {
    return `Минимальная сумма ${carrentBuyer.buyer.minAmount} ₽`;
  }
  if (pointsElement.value > carrentBuyer.buyer.balance.amount) {
    return `Максимальная сумма ${(carrentBuyer.buyer.balance.amount)} ₽`;
  }
};

const validatePayment = () => {
  const isValidMin = paymentElement.value >= 1;
  const isValidMax = paymentElement.value <= state.offers.balances[1].amount;

  return (isValidMin && isValidMax);
};

const renderValidatePaymentMessage = () => {
  if (paymentElement.value < 1) {
    return Messages.ERROR_KEKS;
  }
  if (paymentElement.value > state.offers.balances[1].amount) {
    return `Максимальная сумма ${state.offers.balances[1].amount} КЕКС`;
  }
};

const validatePassword = () => passwordElement.value === PASSWORD;

const onPaymentElementChange = () => {
  pointsElement.value = (paymentElement.value * exchangeRateElement.textContent);
  pristineSellForm.pristine.validate(paymentElement);
  pristineSellForm.pristine.validate(pointsElement);
};

const onPointsElementChange = () => {
  paymentElement.value = (pointsElement.value / exchangeRateElement.textContent).toFixed(DIGIT);
  pristineSellForm.pristine.validate(pointsElement);
  pristineSellForm.pristine.validate(paymentElement);
};

const onbtnChangeAllCarrencyClick = () => {
  const userBalanceElement = document.querySelector('#userCryptoBalance');
  paymentElement.value = userBalanceElement.textContent;
  pointsElement.value = (paymentElement.value * exchangeRateElement.textContent);
  pristineSellForm.pristine.validate(pointsElement);
  pristineSellForm.pristine.validate(paymentElement);
};

const onbtnChangeAllMoneyClick = () => {
  pointsElement.value = carrentBuyer.buyer.balance.amount;
  paymentElement.value = (pointsElement.value / exchangeRateElement.textContent).toFixed(DIGIT);
  pristineSellForm.pristine.validate(pointsElement);
  pristineSellForm.pristine.validate(paymentElement);
};

const initValidatorSellForm = () => {
  pristineSellForm.pristine = new Pristine(modalSellFormElement, pristineConfig);
  pristineSellForm.pristine.addValidator(paymentElement, validatePayment, renderValidatePaymentMessage);
  pristineSellForm.pristine.addValidator(pointsElement, validatePoints, renderValidatePointsMessage);
  pristineSellForm.pristine.addValidator(passwordElement, validatePassword, Messages.ERROR_PASSWORD);
  paymentElement.addEventListener('input', onPaymentElementChange);
  pointsElement.addEventListener('input', onPointsElementChange);
  btnChangeAllCarrencyElement.addEventListener ('click', onbtnChangeAllCarrencyClick);
  btnChangeAllMoneyElement.addEventListener ('click', onbtnChangeAllMoneyClick);
};

const resetPristineSellForm = () => {
  pristineSellForm.pristine.reset();
  paymentElement.removeEventListener('input', onPaymentElementChange);
  pointsElement.removeEventListener('input', onPointsElementChange);
  btnChangeAllCarrencyElement.removeEventListener ('click', onbtnChangeAllCarrencyClick);
  btnChangeAllMoneyElement.removeEventListener ('click', onbtnChangeAllMoneyClick);
  pristineSellForm.pristine.destroy();
  initValidatorSellForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = ButtonName.SAVE;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = ButtonName.CHANGE;
};

const clearPaymentPoints = () => {
  paymentElement.value = '';
  pointsElement.value = '';
};

const setSellFormSubmit = (onSuccess) => {
  modalSellFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristineSellForm.pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendSellData(
        () => {
          onSuccess();
          clearPaymentPoints();
          unblockSubmitButton();
        },
        () => {
          showSellErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    } else {
      showSellErrorMessage();
    }
  });
};

export {setSellFormSubmit, initValidatorSellForm, resetPristineSellForm};
