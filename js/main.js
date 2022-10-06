import {renderUserProfile} from './user-profile.js';
import {getDataUser, getDataContractors} from './api.js';
import {renderUsersList, renderSellersList} from './users.js';
import {setBuyFormSubmit} from './buy-form.js';
import {showBuySuccessMessage, showSellSuccessMessage} from './messages.js';
import {setSellFormSubmit} from './sell-form.js';

getDataUser((user) => renderUserProfile(user));

getDataContractors((users) => {
  renderUsersList(users);
  renderSellersList();
});

setBuyFormSubmit(showBuySuccessMessage);
setSellFormSubmit(showSellSuccessMessage);
