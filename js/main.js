'use strict';

var MAX_ADS = 8;
var ENTER_KEYDOWN = 13;
var ESC_KEYDOWN = 27;
var MAIN_PIN_HEIGHT = 35;

var MainPinCoord = {
  x: 570,
  y: 375 + MAIN_PIN_HEIGHT
};

var RoomsRange = {
  min: 0,
  max: 100
};

var GuestsRange = {
  min: 0,
  max: 3
};

var html = document.querySelector('html');
var pinFlagOpen = false;
var map = document.querySelector('.map');
var mapGap = (html.offsetWidth - map.offsetWidth) / 2;
var mapPinMain = document.querySelector('.map__pin.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinDetailTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var selectRooms = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

var selectRoomsValue;
var selectCapacityValue;
var selectType = document.querySelector('#type');

var inputPrice = document.querySelector('#price');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');

var mainForm = document.querySelector('.ad-form');
var mainFormSubmit = document.querySelector('.ad-form__submit');

var inputAddress = document.querySelector('#address');

var bookingAdData = {
  offerTitles: [
    'Маленькая квартирка рядом с парком',
    'Небольшая лавочка в парке',
    'Императорский дворец в центре Токио',
    'Милейший чердачок',
    'Наркоманский притон',
    'Чёткая хата',
    'Стандартная квартира в центре',
    'Тихая квартирка недалеко от метро'
  ],
  prices: [
    5000,
    15000,
    10000,
    25000,
    12000,
    30000,
    18000,
    50000
  ],
  bookingTypes: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  checks: [
    '12:00',
    '13:00',
    '14:00'
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  descriptions: [
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
    'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
    'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
    'Маленькая квартирка на чердаке. Для самых не требовательных.',
    'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
    'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
    'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
  ],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var bookingTypesDetail = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var bookingTypesRange = {
  'palace': '10000',
  'flat': '1000',
  'house': '5000',
  'bungalo': '0'
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
};

var createLocationX = function () {
  return getRandomInt(mapGap, map.offsetWidth - 50);
};

var createLocationY = function () {
  return getRandomInt(130, 630);
};

var onEnterEvent = function (evt, callback) {
  if (evt.keyCode === ENTER_KEYDOWN) {
    callback();
  }
};

var onEscEvent = function (evt, callback) {
  if (evt.keyCode === ESC_KEYDOWN) {
    callback();
  }
};

var createBookingAd = function (index) {

  return {
    'author': 'img/avatars/user0' + (index + 1) + '.png',
    'offer': {
      'title': bookingAdData.offerTitles[index],
      'address': createLocationX() + ', ' + createLocationY(),
      'price': bookingAdData.prices[index],
      'type':
        bookingAdData.bookingTypes[getRandomInt(0, bookingAdData.bookingTypes.length)],
      'rooms': getRandomInt(RoomsRange.min, RoomsRange.max),
      'guests': getRandomInt(GuestsRange.min, GuestsRange.max),
      'checkin':
        bookingAdData.checks[getRandomInt(0, bookingAdData.checks.length)],
      'checkout':
        bookingAdData.checks[getRandomInt(0, bookingAdData.checks.length)],
      'features':
        bookingAdData.features[getRandomInt(0, bookingAdData.features.length)],
      'description': bookingAdData.descriptions[index],
      'photos':
        bookingAdData.photos
    },
    'location': {
      'x': createLocationX(),
      'y': createLocationY()
    }
  };
};

var createBookingAds = function () {
  var arr = [];

  for (var i = 0; i < MAX_ADS; i++) {
    arr.push(createBookingAd(i));
  }

  return arr;
};

var bookingAds = createBookingAds();

var renderBookingPinAd = function (bookingAd) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = bookingAd.location.x + 'px';
  mapPinElement.style.top = bookingAd.location.y + mapPinElement.offsetHeight + 'px';
  mapPinElement.querySelector('.map__pin img').src = bookingAd.author;
  mapPinElement.querySelector('.map__pin img').alt = bookingAd.offer.title;

  var onPinClick = function () {
    var cartPopup = document.querySelector('.map__card.popup');

    if (cartPopup) {
      map.removeChild(cartPopup);
    }

    map.insertBefore(renderBookingAdDetail(bookingAd), mapFiltersContainer);

    var cartPopupClose = document.querySelector('.popup__close');
    var onRemoveCart = function () {
      map.removeChild(document.querySelector('.map__card.popup'));
      document.removeEventListener('keydown', onEscRemoveCart);
    };

    var onEscRemoveCart = function (evt) {
      onEscEvent(evt, onRemoveCart);
    };

    var onEnterRemoveCart = function (evt) {
      onEnterEvent(evt, onRemoveCart);
    };

    cartPopupClose.addEventListener('click', onRemoveCart);
    cartPopupClose.addEventListener('keydown', onEnterRemoveCart);
    document.addEventListener('keydown', onEscRemoveCart);
  };
  var onPinEnterPress = function (evt) {
    onEnterEvent(evt, onPinClick);
  };

  mapPinElement.addEventListener('click', onPinClick);
  mapPinElement.addEventListener('keydown', onPinEnterPress);


  return mapPinElement;
};


var renderBookingAdDetail = function (bookingAd) {
  var pinDetailFragment = document.createDocumentFragment();
  var cardElement = mapPinDetailTemplate.cloneNode(true);
  var cardImgElement;

  cardElement.querySelector('.popup__avatar').src = bookingAd.author;
  cardElement.querySelector('.popup__title').textContent = bookingAd.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = bookingAd.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = bookingAd.offer.price + '₽/ночь.';
  cardElement.querySelector('.popup__type').textContent = bookingAd.offer.type[bookingTypesDetail];
  cardElement.querySelector('.popup__text--capacity').textContent = bookingAd.offer.rooms + ' комнаты для ' + bookingAd.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + bookingAd.offer.checkin + ' выезд до ' + bookingAd.offer.checkout;
  cardElement.querySelector('.popup__features li').textContent = bookingAd.offer.features;
  cardElement.querySelector('.popup__description').textContent = bookingAd.offer.description;
  cardElement.querySelector('.popup__avatar').src = bookingAd.author;

  for (var i = 0; i < bookingAd.offer.photos.length; i++) {
    if (i === 0) {
      cardElement.querySelector('.popup__photos img').src = bookingAd.offer.photos[0];
      i++;
    }
    cardImgElement = cardElement.querySelector('.popup__photos img').cloneNode();
    cardImgElement.src = bookingAd.offer.photos[i];
    cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
  }

  pinDetailFragment.appendChild(cardElement);
  return pinDetailFragment;
};

var renderBookingPinAds = function () {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < MAX_ADS; i++) {
    pinFragment.appendChild(renderBookingPinAd(bookingAds[i]));
  }

  mapPins.appendChild(pinFragment);
};

var selectRoomsValidation = function () {
  selectRoomsValue = parseInt(selectRooms.value, 10);
  selectCapacityValue = parseInt(selectCapacity.value, 10);

  if (selectRoomsValue < selectCapacityValue) {
    selectCapacity.setCustomValidity('В комнату не поместятся столько гостей');
  } else if (selectCapacityValue === RoomsRange.min && selectRoomsValue === RoomsRange.max) {
    selectCapacity.setCustomValidity('');
  } else if (selectCapacityValue === RoomsRange.min || selectRoomsValue === RoomsRange.max) {
    selectCapacity.setCustomValidity('Тогда квартира на 100 комнат');
  } else {
    selectCapacity.setCustomValidity('');
  }
};

var onTypeChange = function (evt) {
  var minPrice = bookingTypesRange[evt.target.value];

  inputPrice.min = minPrice;
  inputPrice.placeholder = minPrice;
};

var onTimeInChange = function (evt) {
  timeOutInput.value = evt.target.value;
};

var onTimeOutChange = function (evt) {
  timeInInput.value = evt.target.value;
}

var checkValidity = function () {
  selectRoomsValidation();
};

var onEnterPageOpen = function (evt) {
  onEnterEvent(evt, onPageOpen);
};

var onPageOpen = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  inputAddress.value = MainPinCoord.x + ', ' + MainPinCoord.y;
  document.removeEventListener('keydown', onEnterPageOpen);
  if (pinFlagOpen === true) {
    renderBookingPinAds();
    pinFlagOpen = false;
  }
};

var pageInit = function () {
  pinFlagOpen = true;
  mapPinMain.addEventListener('mousedown', onPageOpen);
  mainFormSubmit.addEventListener('click', checkValidity);
  document.addEventListener('keydown', onEnterPageOpen);
  selectType.addEventListener('change', onTypeChange);
  timeInInput.addEventListener('change', onTimeInChange);
  timeOutInput.addEventListener('change', onTimeOutChange);
};

pageInit();
