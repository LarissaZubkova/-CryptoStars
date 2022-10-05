const modalBuyFormElement = document.querySelector('.modal-buy');
const buyMessageErrorElement = modalBuyFormElement.querySelector('.modal__validation-message--error');
const buyMessageSuccessElement = modalBuyFormElement.querySelector('.modal__validation-message--success');

const modalSellFormElement = document.querySelector('.modal-sell');
const sellMessageErrorElement = modalSellFormElement.querySelector('.modal__validation-message--error');
const sellMessageSuccessElement = modalSellFormElement.querySelector('.modal__validation-message--success');

const showBuyErrorMessage = () => {
  buyMessageSuccessElement.setAttribute('style', 'display: none');
};

const showBuySuccessMessage = () => {
  buyMessageErrorElement.setAttribute('style', 'display: none');
};

const hideUserProfile = () => {
  const userProfileElement = document.querySelector('.user-profile');
  userProfileElement.setAttribute('style', 'display: none');
};

const showErrorGetData = () => {
  const errorMessageElement = document.querySelector('#getErrorMessage');
  const containerElement = document.querySelectorAll('.container');
  containerElement.forEach((container) => container.setAttribute('style', 'display: none'))
  errorMessageElement.removeAttribute('style');
};

export {showBuyErrorMessage, showBuySuccessMessage, hideUserProfile, showErrorGetData};
