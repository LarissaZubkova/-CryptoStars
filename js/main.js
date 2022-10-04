import {renderUserProfile} from './user-profile.js';
import {getDataUser, getDataContractors} from './api.js';
import {renderUsersList,renderSellersList} from './users.js';
import './buy-form.js';
import {setUserFormSubmit} from './buy-form.js';
import './sell-form.js';

getDataUser((user) => renderUserProfile(user));

getDataContractors((users) => {
  renderUsersList(users);
  renderSellersList();
});
setUserFormSubmit(console.log('ура'));
