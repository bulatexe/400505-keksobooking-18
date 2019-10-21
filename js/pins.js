'use strict';

(function () {
  var MAX_ADS = 8;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

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

      map.insertBefore(window.renderBookingAdDetail(bookingAd), mapFiltersContainer);

      var cartPopupClose = document.querySelector('.popup__close');
      var onRemoveCart = function () {
        map.removeChild(document.querySelector('.map__card.popup'));
        document.removeEventListener('keydown', onEscRemoveCart);
      };

      var onEscRemoveCart = function (evt) {
        window.util.isEscEvent(evt, onRemoveCart);
      };

      var onEnterRemoveCart = function (evt) {
        window.util.isEnterEvent(evt, onRemoveCart);
      };

      cartPopupClose.addEventListener('click', onRemoveCart);
      cartPopupClose.addEventListener('keydown', onEnterRemoveCart);
      document.addEventListener('keydown', onEscRemoveCart);
    };
    var onPinEnterPress = function (evt) {
      window.util.isEnterEvent(evt, onPinClick);
    };

    mapPinElement.addEventListener('click', onPinClick);
    mapPinElement.addEventListener('keydown', onPinEnterPress);


    return mapPinElement;
  };

  window.renderBookingPinAds = function () {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_ADS; i++) {
      pinFragment.appendChild(renderBookingPinAd(window.bookingAds[i]));
    }

    mapPins.appendChild(pinFragment);
  };

  // renderBookingPinAds();
})();
