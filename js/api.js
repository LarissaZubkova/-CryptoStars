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

export {getDataContractors, getDataUser};
