import {renderSellerPin} from './map.js';

const DIGITS = 0;
const CurrentStatus = {
  buyer: 'buyer',
  seller: 'seller',
};
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
    if (user.status === CurrentStatus.buyer) {
      buyersList.push(user);
    } else {
      sellersList.push(user);
    }
  });
};
const fillUsersData = (element, {isVerified, userName, balance, exchangeRate}) => {
  if (!isVerified) {
    element.querySelector('.users-list__table-name svg').remove();
  }
  element.querySelector('#user-name').textContent = userName;
  element.querySelector('.users-list__table-currency').textContent = balance.currency;
  element.querySelector('.users-list__table-exchangerate').textContent = exchangeRate;
};

const renderSellersList = () => {
  sellersList.forEach(({isVerified, userName, balance, minAmount, paymentMethods, exchangeRate}) => {
    const userElement = userRowTemplateElement.cloneNode(true);
    const badgesListElement = userElement.querySelector('.users-list__badges-list');
    userElement.querySelector('.users-list__table-cashlimit').textContent =
     `${(minAmount * exchangeRate).toFixed(DIGITS)} - ${(exchangeRate * balance.amount).toFixed(DIGITS)} ₽`;
    fillUsersData(userElement,{isVerified, userName, balance, exchangeRate});
    badgesListElement.textContent = '';
    paymentMethods.forEach(((method) => {
      const methodElement = document.createElement('li');
      methodElement.classList.add('users-list__badges-item', 'badge');
      methodElement.textContent = method.provider;
      badgesListElement.appendChild(methodElement);
    }));

    usersListElement.appendChild(userElement);

    if (checkedUsersElement.checked) {
      if (!isVerified) {
        userElement.remove();
      }
    }
  });
  renderSellerPin(sellersList);
};

const renderBuyersList = () => {
  buyersList.forEach(({isVerified, userName, balance, minAmount, exchangeRate}) => {
    const userElement = userRowTemplateElement.cloneNode(true);
    userElement.querySelector('.users-list__badges-list').textContent = '';
    userElement.querySelector('.users-list__table-cashlimit').textContent = `${minAmount} - ${balance.amount} ₽`;
    fillUsersData(userElement,{isVerified, userName, balance, exchangeRate});
    usersListElement.appendChild(userElement);

    if (checkedUsersElement.checked) {
      if (!isVerified) {
        userElement.remove();
      }
    }
  });
};

const onButtonSellClick = () => {
  buttonSellElement.classList.toggle('is-active');
  buttonBuyElement.classList.toggle('is-active');
  usersListElement.textContent = '';
  renderBuyersList();
};

const onButtonBuyClick = () => {
  buttonSellElement.classList.toggle('is-active');
  buttonBuyElement.classList.toggle('is-active');
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

export {renderUsersList, renderSellersList};
