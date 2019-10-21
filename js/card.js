'use strict';

(function () {
  var BookingTypesDetail = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapPinDetailTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');

  window.renderBookingAdDetail = function (bookingAd) {
    var pinDetailFragment = document.createDocumentFragment();
    var cardElement = mapPinDetailTemplate.cloneNode(true);
    var cardImgElement;

    cardElement.querySelector('.popup__avatar').src = bookingAd.author;
    cardElement.querySelector('.popup__title').textContent = bookingAd.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = bookingAd.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = bookingAd.offer.price + '₽/ночь.';
    cardElement.querySelector('.popup__type').textContent = bookingAd.offer.type[BookingTypesDetail];
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
})();
