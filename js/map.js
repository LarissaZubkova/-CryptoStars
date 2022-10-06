import {openModalWindow} from './modal-buy.js';
import {checkIsVarified} from './utils.js';

const ADDRESS_DEFAULT = {
  lat: 59.92749,
  lng: 30.31127,
};
const SCALE = 10;
const MAP_CANVAS = 'map';
const DIGITS = 0;
const Url = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: 'https://www.openstreetmap.org/copyright',
  VERIFIED_ICON: './img/pin-verified.svg',
  ORDINARY_ICON: 'img/pin.svg',
};
const IconSize = {
  SIZE: [36, 46],
  ANCHOR: [18, 46],
};
const buttonListElement = document.querySelector('.btn-list');
const buttonMapElement = document.querySelector('.btn-map');
const usersListElement = document.querySelector('.users-list');
const mapElement = document.querySelector('.map');
const map = L.map(MAP_CANVAS).setView(ADDRESS_DEFAULT, SCALE);
const markerGroup = L.layerGroup().addTo(map);
const buttonSellElement = document.querySelector('.sell');

const displayMap = () => {
  L.tileLayer(
    Url.TILE_LAYER,
    {
      attribution: `&copy; <a href=${Url.ATTRIBUTION}>OpenStreetMap</a> contributors`,
    },
  ).addTo(map);
};
const verifiedIcon = L.icon({
  iconUrl: Url.VERIFIED_ICON,
  iconSize: IconSize.SIZE,
  iconAnchor: IconSize.ANCHOR,
});
const ordinaryIcon = L.icon({
  iconUrl: Url.ORDINARY_ICON,
  iconSize: IconSize.SIZE,
  iconAnchor: IconSize.ANCHOR,
});

const renderMapBaloon = (user) => {
  const mapBaloonTemplateElement = document.querySelector('#map-baloon__template')
    .content
    .querySelector('.user-card');
  const mapBaloonElement = mapBaloonTemplateElement.cloneNode(true);
  const userNameElement = mapBaloonElement.querySelector('.user-card__user-name span');
  const badgesListElement = mapBaloonElement.querySelector('.user-card__badges-list');
  const cardChangeBtnElement = mapBaloonElement.querySelector('.user-card__change-btn');

  checkIsVarified(mapBaloonElement.querySelector('.user-card__user-name svg'), user);
  userNameElement.textContent = user.userName;
  userNameElement.setAttribute('style', 'width: 150px');
  mapBaloonElement.querySelector('#userCardExchangerate').textContent = user.exchangeRate;
  mapBaloonElement.querySelector('#userCardCashlimit').textContent =
  `${user.minAmount} - ${(user.exchangeRate * user.balance.amount).toFixed(DIGITS)} ₽`;
  badgesListElement.textContent = '';
  user.paymentMethods.forEach(((method) => {
    const methodElement = document.createElement('li');
    methodElement.classList.add('users-list__badges-item', 'badge');
    methodElement.textContent = method.provider;
    badgesListElement.appendChild(methodElement);
  }));

  const onCardChangeBtnElementClick = (evt) => {
    mapElement.closest('.container').setAttribute('style', 'display: none');
    openModalWindow(evt);
  };
  cardChangeBtnElement.addEventListener('click', onCardChangeBtnElementClick);
  return mapBaloonElement;
};

const createMarker = (seller) => {
  const lat = seller.coords.lat;
  const lng = seller.coords.lng;
  const getIcon = () => {
    if (seller.isVerified) {
      return verifiedIcon;
    } return ordinaryIcon;
  };
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: getIcon(),
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(renderMapBaloon(seller));
  return marker;
};

const renderSellerPin = (users) => {
  const checkedUsersElement = document.querySelector('#checked-users');
  const sellersForCash = users.filter((user) => user.coords);
  const verifiedSellers = sellersForCash.filter((user) => user.isVerified);
  if (checkedUsersElement.checked) {
    markerGroup.clearLayers();
    verifiedSellers.map((seller) => createMarker(seller));
  } else {
    sellersForCash.map((seller) => createMarker(seller));
  }
};

const onButtonMapElementClick = () => {
  const buttonBuyElement = document.querySelector('.buy');
  buttonMapElement.classList.add('is-active');
  buttonListElement.classList.remove('is-active');
  usersListElement.setAttribute('style', 'display: none');
  mapElement.closest('.container').removeAttribute('style');
  buttonSellElement.setAttribute('disabled', 'disabled');
  buttonBuyElement.classList.add('is-active');
  buttonSellElement.classList.remove('is-active');
  displayMap();
};

const onButtonListElementClick = () => {
  buttonMapElement.classList.remove('is-active');
  buttonListElement.classList.add('is-active');
  usersListElement.removeAttribute('style');
  mapElement.closest('.container').setAttribute('style', 'display: none');
  buttonSellElement.removeAttribute('disabled');
};

buttonMapElement.addEventListener('click', onButtonMapElementClick);
buttonListElement.addEventListener('click', onButtonListElementClick);

export {renderSellerPin};
