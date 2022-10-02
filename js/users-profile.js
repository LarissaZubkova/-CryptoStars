const CurrencyName = {
  keks: 'KEKS',
  ruble: 'RUB',
};

const renderUserProfile = ({balances, userName}) => {
  const userProfileElement = document.querySelector('.user-profile');
  const userCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
  const userFiatBalanceElement = userProfileElement.querySelector('#user-fiat-balance');
  const userNameElement = userProfileElement.querySelector('.user-profile__name span');

  balances.forEach((balance) =>{
    if (balance.currency === CurrencyName.keks) {
      userCryptoBalanceElement.textContent = balance.amount;
    }
    if (balance.currency === CurrencyName.ruble) {
      userFiatBalanceElement.textContent = balance.amount;
    }
    userNameElement.textContent = userName;
  });
};

export {renderUserProfile};
