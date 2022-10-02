import {renderUserProfile} from './users-profile.js';
import {getDataUser, getDataContractors} from './api.js';
import {renderUsersList,renderSellersList} from './users.js';
import './form.js';

getDataUser((user) => renderUserProfile(user));

getDataContractors((users) => {
  renderUsersList(users);
  renderSellersList();
});
