import {renderSellerPin} from './map.js';
import {checkIsVarified} from './utils.js';

const DIGITS = 0;
const STATUS_BUYER = 'buyer';

const sellersList = [];
const buyersList = [];
const checkedUsersElement = document.querySelector('#checked-users');
const usersListElement = document.querySelector('.users-list__table-body');
const buttonBuyElement = document.querySelector('.buy');
const buttonSellElement = document.querySelector('.sell');
const userRowTemplateElement = document.querySelector('#user-table-row__template')
  .content
  .querySelector('.users-list__table-row');

const renderUsersList = (users) => {
  users.forEach((user) => {
    if (user.status === STATUS_BUYER) {
      buyersList.push(user);
    } else {
      sellersList.push(user);
    }
  });
};

const fillUsersData = (element, user) => {
  checkIsVarified(element.querySelector('.users-list__table-name svg'), user);
  element.querySelector('#user-name').textContent = user.userName;
  element.querySelector('.users-list__table-currency').textContent = user.balance.currency;
  element.querySelector('.users-list__table-exchangerate').textContent = user.exchangeRate;
};

const renderSellersList = () => {
  sellersList.forEach((user) => {
    const userElement = userRowTemplateElement.cloneNode(true);
    const badgesListElement = userElement.querySelector('.users-list__badges-list');
    userElement.querySelector('.users-list__table-cashlimit').textContent =
     `${user.minAmount} - ${(user.exchangeRate * user.balance.amount).toFixed(DIGITS)} ₽`;
    fillUsersData(userElement, user);
    badgesListElement.textContent = '';
    user.paymentMethods.forEach(((method) => {
      const methodElement = document.createElement('li');
      methodElement.classList.add('users-list__badges-item', 'badge');
      methodElement.textContent = method.provider;
      badgesListElement.appendChild(methodElement);
    }));

    usersListElement.appendChild(userElement);

    if (checkedUsersElement.checked) {
      checkIsVarified(userElement, user);
    }
  });
  renderSellerPin(sellersList);
};

const renderBuyersList = () => {
  buyersList.forEach((user) => {
    const userElement = userRowTemplateElement.cloneNode(true);
    userElement.querySelector('.users-list__badges-list').textContent = '';
    userElement.querySelector('.users-list__table-cashlimit').textContent =
     `${user.minAmount} - ${user.balance.amount} ₽`;
    fillUsersData(userElement, user);
    usersListElement.appendChild(userElement);

    if (checkedUsersElement.checked) {
      checkIsVarified(userElement, user);
    }
  });
};

const changeElementClass = () => {
  buttonSellElement.classList.toggle('is-active');
  buttonBuyElement.classList.toggle('is-active');
};

const onButtonSellClick = () => {
  changeElementClass();
  usersListElement.textContent = '';
  renderBuyersList();
};

const onButtonBuyClick = () => {
  changeElementClass();
  usersListElement.textContent = '';
  renderSellersList();
};

const onCheckedUsersElementClick = () => {
  usersListElement.textContent = '';
  if (buttonSellElement.classList.contains('is-active')) {
    renderBuyersList();
  } else {
    renderSellersList();
  }
};

buttonSellElement.addEventListener('click', onButtonSellClick);
buttonBuyElement.addEventListener('click', onButtonBuyClick);
checkedUsersElement.addEventListener('change', onCheckedUsersElementClick);

export {renderUsersList, renderSellersList, sellersList, buyersList};
