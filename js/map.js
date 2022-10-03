import {openModalWindow} from './modal-window.js';

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

const buttonListElement = document.querySelector('.btn-list');
const buttonMapElement = document.querySelector('.btn-map');
const usersListElement = document.querySelector('.users-list');
const mapElement = document.querySelector('.map');
const map = L.map(MAP_CANVAS).setView(ADDRESS_DEFAULT, SCALE);
const markerGroup = L.layerGroup().addTo(map);

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
  iconSize: [36, 46],
  iconAnchor: [18, 46],
});
const ordinaryIcon = L.icon({
  iconUrl: Url.ORDINARY_ICON,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
});

const renderMapBaloon = ({isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
  const mapBaloonTemplateElement = document.querySelector('#map-baloon__template')
    .content
    .querySelector('.user-card');
  const mapBaloonElement = mapBaloonTemplateElement.cloneNode(true);
  const userNameElement = mapBaloonElement.querySelector('.user-card__user-name span');
  const badgesListElement = mapBaloonElement.querySelector('.user-card__badges-list');
  const cardChangeBtnElement = mapBaloonElement.querySelector('.user-card__change-btn');

  if (!isVerified) {
    mapBaloonElement.querySelector('.user-card__user-name svg').remove();
  }
  userNameElement.textContent = userName;
  userNameElement.setAttribute('style', 'width: 150px');
  mapBaloonElement.querySelector('#user-card__exchangerate').textContent = exchangeRate;
  mapBaloonElement.querySelector('#user-card__cashlimit').textContent =
  `${minAmount} - ${(exchangeRate * balance.amount).toFixed(DIGITS)} ₽`;
  badgesListElement.textContent = '';
  paymentMethods.forEach(((method) => {
    const methodElement = document.createElement('li');
    methodElement.classList.add('users-list__badges-item', 'badge');
    methodElement.textContent = method.provider;
    badgesListElement.appendChild(methodElement);
  }));
  const onCardChangeBtnElementClick = () => {
    mapElement.closest('.container').setAttribute('style', 'display: none');
    openModalWindow();
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
  buttonMapElement.classList.add('is-active');
  buttonListElement.classList.remove('is-active');
  usersListElement.setAttribute('style', 'display: none');
  mapElement.closest('.container').removeAttribute('style');
  displayMap();
};

buttonMapElement.addEventListener('click', onButtonMapElementClick);

export {renderSellerPin};
