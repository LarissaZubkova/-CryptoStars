const userProfileElement = document.querySelector('.user-profile');
const userCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
const userFiatBalanceElement = userProfileElement.querySelector('#user-fiat-balance');
const userNameElement = userProfileElement.querySelector('.user-profile__name span');

const renderUserProfile = (user) => {
  userCryptoBalanceElement.textContent = user.balances[1];
};

export {renderUserProfile};
