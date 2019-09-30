'use strict';
var BOOKING_LENGTH = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinDetailTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
map.classList.remove('map--faded');

var mapGap = (document.querySelector('html').offsetWidth - map.offsetWidth) / 2;

var getRandomIntInclusive = function (min, max) {
  // Максимум и минимум включаются
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var offerTitles = [
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро'
];

var prices = [
  5000,
  15000,
  10000,
  25000,
  12000,
  30000,
  18000,
  50000
];

var bookingTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var bookingTypesDetail = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var checks = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var descriptions = [
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var createLocationX = function () {
  return getRandomIntInclusive(mapGap, map.offsetWidth - 50);
};

var createLocationY = function () {
  return getRandomIntInclusive(130, 630);
};

var createBookingAd = function (index) {
  return {
    'author': 'img/avatars/user0' + (index + 1) + '.png',
    'offer': {
      'title': offerTitles[index],
      'address': createLocationX() + ', ' + createLocationY(),
      'price': prices[index],
      'type': bookingTypes[getRandomIntInclusive(0, bookingTypes.length - 1)],
      'rooms': getRandomIntInclusive(1, 5),
      'guests': getRandomIntInclusive(1, 5),
      'checkin': checks[getRandomIntInclusive(0, checks.length - 1)],
      'checkout': checks[getRandomIntInclusive(0, checks.length - 1)],
      'features': features.splice(0, getRandomIntInclusive(0, features.length - 2)),
      'description': descriptions[index],
      'photos': photos
    },
    'location': {
      'x': createLocationX(),
      'y': createLocationY()
    }
  };
};

var createBookingAds = function () {
  var bookingAds = [];

  for (var i = 0; i < BOOKING_LENGTH; i++) {
    bookingAds.push(createBookingAd(i));
  }

  return bookingAds;
};

var bookingAds = createBookingAds();

var renderBookingPinAd = function (bookingAd) {
  var mapElement = mapPinTemplate.cloneNode(true);

  mapElement.style.left = bookingAd.location.x + 'px';
  mapElement.style.top = bookingAd.location.y + 'px';
  mapElement.querySelector('.map__pin img').src = bookingAd.author;
  mapElement.querySelector('.map__pin img').alt = bookingAd.offer.title;

  return mapElement;
};

var renderBookingAdDetail = function (bookingAd) {
  var bookingDetail = mapPinDetailTemplate.cloneNode(true);

  bookingDetail.querySelector('.popup__title').textContent = bookingAd.offer.title;
  bookingDetail.querySelector('.popup__text--address').textContent = bookingAd.offer.address;
  bookingDetail.querySelector('.popup__text--price').textContent = bookingAd.offer.price + '₽/ночь.';
  bookingDetail.querySelector('.popup__type').textContent = bookingTypesDetail[bookingAd.offer.type];
  bookingDetail.querySelector('.popup__text--capacity').textContent = bookingAd.offer.rooms + ' комнаты для ' + bookingAd.offer.guests + ' гостей';
  bookingDetail.querySelector('.popup__text--time').textContent = 'Заезд после ' + bookingAd.offer.checkin + ' выезд до ' + bookingAd.offer.checkout;
  bookingDetail.querySelector('.popup__features li').textContent = bookingAd.offer.features;
  bookingDetail.querySelector('.popup__description').textContent = bookingAd.offer.description;
  bookingDetail.querySelector('.popup__avatar').src = bookingAd.author;

  for (var i = 0; i < bookingAd.offer.photos.length; i++) {
    if (i === 0) {
      bookingDetail.querySelector('.popup__photos img').src = bookingAd.offer.photos[0];
      i++;
    }
    var bookingDetailImg = bookingDetail.querySelector('.popup__photos img').cloneNode();
    bookingDetailImg.src = bookingAd.offer.photos[i];
    bookingDetail.querySelector('.popup__photos').appendChild(bookingDetailImg);
  }


  return bookingDetail;
};

var renderBookingsPinAds = function () {

  for (var i = 0; i < BOOKING_LENGTH; i++) {
    fragment.appendChild(renderBookingPinAd(bookingAds[i]));
  }

  mapPins.appendChild(fragment);
};

var renderBookingsDetailAds = function () {

  for (var i = 0; i < BOOKING_LENGTH; i++) {
    fragment.appendChild(renderBookingAdDetail(bookingAds[i]));
  }

  map.insertBefore(fragment, mapFiltersContainer);
};

renderBookingsPinAds();
renderBookingsDetailAds();
