import {renderUserProfile} from './user.js';
import {getDataUser} from './api.js';

getDataUser((user) => {
  console.log(user);
  renderUserProfile(user);
});
