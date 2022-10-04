import {isEscapeKey} from './utils.js';
import {sellersList} from './users.js';
import {fillModalBuyerCard} from './modul-sell.js';
import {state} from './user-profile.js';

const Currency = {
  keks: 'KEKS',
  rub: 'RUB'
};

const usersListElement = document.querySelector('.users-list__table-body');
const body = document.querySelector('body');
const modalBuyElement = document.querySelector('.modal--buy');
const modalSellElement = document.querySelector('.modal--sell');
const modalBuyFormElement = modalBuyElement.querySelector('.modal-buy');
const modalSellFormElement = modalSellElement.querySelector('.modal-sell');
const buyCloseBtnElement = modalBuyElement.querySelector('.modal__close-btn');
const sellCloseBtnElement = modalSellElement.querySelector('.modal__close-btn');
const buyOverlayElement = modalBuyElement.querySelector('.modal__overlay');
const sellOverlayElement = modalSellElement.querySelector('.modal__overlay');
const buttonSellElement = document.querySelector('.sell');
const sellSelectElement = modalBuyFormElement.querySelector('#sellSelect');

let carrentSeller = {};
const setCarrentSeller = (calculetedSeller) => {
  carrentSeller = calculetedSeller;
};

const fillModalSellerCard = (evt) => {
  const userListElement = evt.target.closest('.users-list__table-row');
  const verifiedSellerElement = modalBuyFormElement.querySelector('svg');
  const exchangeRateElement = modalBuyFormElement.querySelector('#transaction__exchange-rate');
  const hiddenIdElement = modalBuyFormElement.querySelector('.contractor-id');
  const hiddenRateElement = modalBuyFormElement.querySelector('.exchange-rate');
  const sendingCurrencyElement = modalBuyFormElement.querySelector('.sending-currency');
  const receivingCurrencyElement = modalBuyFormElement.querySelector('.receiving-currency');

  if (!userListElement.querySelector('svg')) {
    verifiedSellerElement.setAttribute('style', 'display: none;');
  } else {
    verifiedSellerElement.removeAttribute('style');
  }
  modalBuyFormElement.querySelector('#seller-name').textContent =
  userListElement.querySelector('#user-name').textContent;
  exchangeRateElement.textContent = userListElement.querySelector('.users-list__table-exchangerate').textContent;
  modalBuyFormElement.querySelector('#transaction__limit').textContent =
  userListElement.querySelector('.users-list__table-cashlimit').textContent;

  const calculetedSeller = sellersList.filter((seller) => {
    if (seller.exchangeRate === Number(exchangeRateElement.textContent)) {
      return seller;
    }
  }).reduce((seller) => seller);

  setCarrentSeller(calculetedSeller);

  hiddenIdElement.value = carrentSeller.id;
  hiddenRateElement.value = exchangeRateElement.textContent;
  sendingCurrencyElement.value = Currency.rub;
  receivingCurrencyElement.value = Currency.keks;
  console.log(state.offers.wallet.address);
  modalBuyFormElement.querySelector('#walletAddress').value = Number(state.offers.wallet.address);

};

const renderModalCard = (evt) =>{
  if (buttonSellElement.classList.contains('is-active')) {
    fillModalBuyerCard(evt);
  } else {
    fillModalSellerCard(evt);
  }
};

const onModulCloseBtnElementClick = () => {
  closeModalWindow();
};

const onModalEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const onModalOverlayElementClick = (evt) => {
  const modalContentElement = modalBuyElement.querySelector('.modal__content');
  if(evt.target.closest('.modal__content') !== modalContentElement) {
    closeModalWindow();
  }
};

const fillSellCardData = () => {
  const firstSelectElement = sellSelectElement.children[0];
  sellSelectElement.textContent = '';
  sellSelectElement.appendChild(firstSelectElement);
  const currentPaymentMethods = carrentSeller.paymentMethods;
  for (const method of currentPaymentMethods) {
    const methodName = method.provider;
    const methodOption = document.createElement('option');
    methodOption.textContent = methodName;
    methodOption.value = methodName;
    sellSelectElement.appendChild(methodOption);
  }
  sellSelectElement.addEventListener('change', onSellSelectElementChange);
};

const openModalWindow = (evt) => {
  body.classList.add('scroll-lock');
  if (buttonSellElement.classList.contains('is-active')) {
    modalSellElement.removeAttribute('style');
    sellCloseBtnElement.addEventListener('click', onModulCloseBtnElementClick);
    sellOverlayElement.addEventListener('click', onModalOverlayElementClick);
  } else {
    modalBuyElement.removeAttribute('style');
    buyCloseBtnElement.addEventListener('click', onModulCloseBtnElementClick);
    buyOverlayElement.addEventListener('click', onModalOverlayElementClick);
  }
  renderModalCard(evt);
  fillSellCardData();
  document.addEventListener('keydown', onModalEscDown);
};

const onModalSubmitClick = (evt) => {
  const submitButtonElement = evt.target.closest('.btn--greenborder');
  if (submitButtonElement) {
    openModalWindow(evt);
  }
};

function closeModalWindow () {
  const buttonMapElement = document.querySelector('.btn-map');
  const listElement = document.querySelector('.users-list');
  const mapElement = document.querySelector('.map');

  body.classList.remove('scroll-lock');
  document.removeEventListener('keydown', onModalEscDown);
  if (buttonSellElement.classList.contains('is-active')) {
    modalSellFormElement.reset();
    modalSellElement.setAttribute('style', 'display: none;');
    sellCloseBtnElement.removeEventListener('click', onModulCloseBtnElementClick);
    sellOverlayElement.removeEventListener('click', onModalOverlayElementClick);
  } else {
    modalBuyFormElement.reset();
    modalBuyElement.setAttribute('style', 'display: none;');
    buyCloseBtnElement.removeEventListener('click', onModulCloseBtnElementClick);
    buyOverlayElement.removeEventListener('click', onModalOverlayElementClick);
    sellSelectElement.removeEventListener('change', onSellSelectElementChange);
  }
  if (buttonMapElement.classList.contains('is-active')) {
    listElement.setAttribute('style', 'display: none');
    mapElement.closest('.container').removeAttribute('style');
  }
}

usersListElement.addEventListener('click', onModalSubmitClick);

function onSellSelectElementChange () {
  const sellerCastomElement = modalBuyFormElement.querySelector('#sellerCastom');
  const currentPaymentMethods = carrentSeller.paymentMethods;
  if (sellSelectElement.value !== 'Cash in person') {
    const selectedMethod = currentPaymentMethods.filter((provider) => provider.provider === sellSelectElement.value);
    sellerCastomElement.value = selectedMethod.reduce((seller) => seller).accountNumber.split(' ').join('');
  } else {
    sellerCastomElement.value = '';
  }
}

export {modalSellFormElement, modalBuyFormElement, openModalWindow};
