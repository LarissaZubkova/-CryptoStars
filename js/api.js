import {hideUserProfile, showErrorGetData, showBuyErrorMessage} from './messages.js';

const Url = {
  GET_USER: 'https://cryptostar.grading.pages.academy/user',
  GET_CONTRACTORS: 'https://cryptostar.grading.pages.academy/contractors',
  SEND: 'https://cryptostar.grading.pages.academy/',
};

const getDataUser = (onSuccess) => {
  fetch(Url.GET_USER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        hideUserProfile();
      }
    })
    .then((user) => onSuccess(user))
    .catch(() => {
      hideUserProfile();
    });
};

const getDataContractors = (onSuccess) => {
  fetch(Url.GET_CONTRACTORS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showErrorGetData();
      }
    })
    .then((user) => onSuccess(user))
    .catch(() => {
      showErrorGetData();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SEND,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        console.log('сервер недоступен');
        showBuyErrorMessage();
      }
    })
    .catch(() => {
      showBuyErrorMessage();
    });
};

export {getDataContractors, getDataUser,sendData};
