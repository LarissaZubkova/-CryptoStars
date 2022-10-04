const getDataUser = (onSuccess) => {
  fetch('https://cryptostar.grading.pages.academy/user')
    .then((response) => response.json())
    .then((wizards) => {
      onSuccess(wizards);
    });
};

const getDataContractors = (onSuccess) => {
  fetch('https://cryptostar.grading.pages.academy/contractors')
    .then((response) => response.json())
    .then((contractors) => {
      onSuccess(contractors);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://cryptostar.grading.pages.academy/',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getDataContractors, getDataUser,sendData};
