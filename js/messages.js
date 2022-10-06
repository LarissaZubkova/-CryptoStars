const modalBuyFormElement = document.querySelector('.modal-buy');
const buyMessageErrorElement = modalBuyFormElement.querySelector('.modal__validation-message--error');
const buyMessageSuccessElement = modalBuyFormElement.querySelector('.modal__validation-message--success');

const modalSellFormElement = document.querySelector('.modal-sell');
const sellMessageErrorElement = modalSellFormElement.querySelector('.modal__validation-message--error');
const sellMessageSuccessElement = modalSellFormElement.querySelector('.modal__validation-message--success');

const showBuyErrorMessage = () => {
  buyMessageErrorElement.removeAttribute('style');
  buyMessageSuccessElement.setAttribute('style', 'display: none');
};

const showBuySuccessMessage = () => {
  buyMessageSuccessElement.removeAttribute('style');
  buyMessageErrorElement.setAttribute('style', 'display: none');
};

const showSellErrorMessage = () => {
  sellMessageErrorElement.removeAttribute('style');
  sellMessageSuccessElement.setAttribute('style', 'display: none');
};

const showSellSuccessMessage = () => {
  sellMessageSuccessElement.removeAttribute('style');
  sellMessageErrorElement.setAttribute('style', 'display: none');
};

const hideMessagesBuyForm = () => {
  buyMessageSuccessElement.setAttribute('style', 'display: none');
  buyMessageErrorElement.setAttribute('style', 'display: none');
};

const hideMessagesSellForm = () => {
  sellMessageSuccessElement.setAttribute('style', 'display: none');
  sellMessageErrorElement.setAttribute('style', 'display: none');
};

const hideUserProfile = () => {
  const userProfileElement = document.querySelector('.user-profile');
  userProfileElement.setAttribute('style', 'display: none');
};

const showErrorGetData = () => {
  const errorMessageElement = document.querySelector('#getErrorMessage');
  const containerElement = document.querySelectorAll('.container');
  containerElement.forEach((container) => container.setAttribute('style', 'display: none'));
  errorMessageElement.removeAttribute('style');
};

const showErrorGetDataList = () => {
  const errorMessageElement = document.querySelector('.container--lightbackground');
  document.querySelector('.users-list__table-body').setAttribute('style', 'display: none');
  errorMessageElement.removeAttribute('style');
};

export {showBuyErrorMessage, showBuySuccessMessage, hideUserProfile, showErrorGetData, showSellErrorMessage, showSellSuccessMessage, hideMessagesBuyForm, hideMessagesSellForm, showErrorGetDataList};
