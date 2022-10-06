import {hideUserProfile, showErrorGetData, showBuyErrorMessage, showSellErrorMessage, showErrorGetDataList} from './messages.js';

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
      showErrorGetDataList();
    });
};

const sendBuyData = (onSuccess, onFail, body) => {
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
        onFail();
      }
    })
    .catch(() => {
      showBuyErrorMessage();
    });
};

const sendSellData = (onSuccess, onFail, body) => {
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
        onFail();
      }
    })
    .catch(() => {
      showSellErrorMessage();
    });
};

export {getDataContractors, getDataUser, sendBuyData, sendSellData};
