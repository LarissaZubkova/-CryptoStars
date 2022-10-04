import {buyersList} from './users.js';
import {state} from './user-profile.js';

const Currency = {
  keks: 'KEKS',
  rub: 'RUB'
};
const SelectOptions = {
  cash: 'Cash in person',
  default: 'Выберите платёжную систему',
};
const modalSellElement = document.querySelector('.modal--sell');
const modalSellFormElement = modalSellElement.querySelector('.modal-sell');
const buySelectElement = modalSellFormElement.querySelector('#buySelect');
const carrentBuyer = {
  buyer: [],
};

const setCarrentBuyer = (calculetedBuyer) => {
  carrentBuyer.buyer = calculetedBuyer;
};

const fillModalBuyerCard = (evt) => {
  const userListElement = evt.target.closest('.users-list__table-row');
  const verifiedBuyerElement = modalSellFormElement.querySelector('svg');
  const exchangeRateElement = modalSellFormElement.querySelector('#transaction__exchange-rate');
  const hiddenIdElement = modalSellFormElement.querySelector('.contractor-id');
  const hiddenRateElement = modalSellFormElement.querySelector('.exchange-rate');
  const sendingCurrencyElement = modalSellFormElement.querySelector('.sending-currency');
  const receivingCurrencyElement = modalSellFormElement.querySelector('.receiving-currency');

  if (!userListElement.querySelector('svg')) {
    verifiedBuyerElement.setAttribute('style', 'display: none;');
  } else {
    verifiedBuyerElement.removeAttribute('style');
  }
  modalSellFormElement.querySelector('#buyer-name').textContent =
    userListElement.querySelector('#user-name').textContent;
  exchangeRateElement.textContent = userListElement.querySelector('.users-list__table-exchangerate').textContent;
  modalSellFormElement.querySelector('#transaction__limit').textContent =
    userListElement.querySelector('.users-list__table-cashlimit').textContent;

  const calculetedBuyer = buyersList.filter((buyer) => {
    if (buyer.exchangeRate === Number(exchangeRateElement.textContent)) {
      return buyer;
    }
  }).reduce((buyer) => buyer);

  setCarrentBuyer(calculetedBuyer);

  hiddenIdElement.value = carrentBuyer.id;
  hiddenRateElement.value = exchangeRateElement.textContent;
  sendingCurrencyElement.value = Currency.rub;
  receivingCurrencyElement.value = Currency.keks;

  modalSellFormElement.querySelector('#buyerWalletAddress').value = carrentBuyer.buyer.wallet.address;
};

const fillSellCardData = () => {
  const firstSelectElement = buySelectElement.children[0];
  buySelectElement.textContent = '';
  buySelectElement.appendChild(firstSelectElement);
  const currentPaymentMethods = state.offers.paymentMethods;

  for (const method of currentPaymentMethods) {
    const methodName = method.provider;
    const methodOption = document.createElement('option');
    methodOption.textContent = methodName;
    methodOption.value = methodName;
    buySelectElement.appendChild(methodOption);
  }
  buySelectElement.addEventListener('change', onBuySelectElementChange);
};

function onBuySelectElementChange () {
  const buyerCastomElement = modalSellFormElement.querySelector('#buyerCastom');
  const currentPaymentMethods = state.offers.paymentMethods;
  if (buySelectElement.value !== SelectOptions.cash && buySelectElement.value !== SelectOptions.default) {
    const selectedMethod = currentPaymentMethods.filter((provider) => provider.provider === buySelectElement.value);
    buyerCastomElement.value = selectedMethod.reduce((seller) => seller).accountNumber.split(' ').join('');
  } else {
    buyerCastomElement.value = '';
  }
}

export {fillModalBuyerCard, fillSellCardData, onBuySelectElementChange, modalSellFormElement};
