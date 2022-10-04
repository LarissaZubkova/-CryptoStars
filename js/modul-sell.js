const fillModalBuyerCard = (evt) => {
  const modalSellElement = document.querySelector('.modal--sell');
  const modalSellFormElement = modalSellElement.querySelector('.modal-sell');
  const userListElement = evt.target.closest('.users-list__table-row');
  const verifiedBuyerElement = modalSellFormElement.querySelector('svg');
  if (!userListElement.querySelector('svg')) {
    verifiedBuyerElement.setAttribute('style', 'display: none;');
  } else {
    verifiedBuyerElement.removeAttribute('style');
  }
  modalSellFormElement.querySelector('#buyer-name').textContent =
    userListElement.querySelector('#user-name').textContent;
  modalSellFormElement.querySelector('#transaction__exchange-rate').textContent =
    userListElement.querySelector('.users-list__table-exchangerate').textContent;
  modalSellFormElement.querySelector('#transaction__limit').textContent =
    userListElement.querySelector('.users-list__table-cashlimit').textContent;
};

export {fillModalBuyerCard};
