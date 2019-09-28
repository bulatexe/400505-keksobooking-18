'use strict';
var BOOKING_LENGTH = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
      'address': createLocationX() + ' ' + createLocationY(),
      'price': prices[index],
      'type': bookingTypes[getRandomIntInclusive(0, bookingTypes.length)],
      'rooms': getRandomIntInclusive(1, 5),
      'guests': getRandomIntInclusive(1, 5),
      'checkin': getRandomIntInclusive(0, checks.length),
      'checkout': getRandomIntInclusive(0, checks.length),
      'features': features.splice(0, getRandomIntInclusive(0, features.length)),
      'description': descriptions[index],
      'photos': photos.splice(0, getRandomIntInclusive(0, photos.length))
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

var renderBookingAd = function (bookingAd) {
  var mapElement = mapPinTemplate.cloneNode(true);

  mapElement.style.left = bookingAd.location.x + 'px';
  mapElement.style.top = bookingAd.location.y + 'px';
  mapElement.querySelector('.map__pin img').src = bookingAd.author;
  mapElement.querySelector('.map__pin img').alt = bookingAd.offer.title;

  return mapElement;
};

var renderBookingsAds = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < BOOKING_LENGTH; i++) {
    fragment.appendChild(renderBookingAd(bookingAds[i]));
  }

  mapPins.appendChild(fragment);
};

renderBookingsAds();
