const CurrencyName = {
  keks: 'KEKS',
  ruble: 'RUB',
};

const state = {
  offers: [],
};

const setProfileData = (user) => {
  state.offers = user;
};

const renderUserProfile = (user) => {
  const userProfileElement = document.querySelector('.user-profile');
  const userCryptoBalanceElement = userProfileElement.querySelector('#userCryptoBalance');
  const userFiatBalanceElement = userProfileElement.querySelector('#userFiatBalance');
  const userNameElement = userProfileElement.querySelector('.user-profile__name span');

  user.balances.forEach((balance) =>{
    if (balance.currency === CurrencyName.keks) {
      userCryptoBalanceElement.textContent = balance.amount;
    }
    if (balance.currency === CurrencyName.ruble) {
      userFiatBalanceElement.textContent = balance.amount;
    }
  });
  userNameElement.textContent = user.userName;
  setProfileData(user);
  console.log(state.offers);
};

export {renderUserProfile, state};
