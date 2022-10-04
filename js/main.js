import {renderUserProfile} from './user-profile.js';
import {getDataUser, getDataContractors} from './api.js';
import {renderUsersList,renderSellersList} from './users.js';
import './form.js';
import {setUserFormSubmit} from './form.js';

getDataUser((user) => renderUserProfile(user));

getDataContractors((users) => {
  renderUsersList(users);
  renderSellersList();
});
setUserFormSubmit(console.log('ура'));
