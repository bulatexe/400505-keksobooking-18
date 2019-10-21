'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 35;

  var pinFlagOpen = false;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var inputAddress = document.querySelector('#address');

  var MainPinCoords = {
    x: 570,
    y: 375 + MAIN_PIN_HEIGHT
  };

  var onEnterPageOpen = function (evt) {
    window.util.isEnterEvent(evt, onPageOpen);
  };

  var onPageOpen = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    inputAddress.value = MainPinCoords.x + ', ' + MainPinCoords.y;
    document.removeEventListener('keydown', onEnterPageOpen);
    if (pinFlagOpen === true) {
      window.renderBookingPinAds();
      pinFlagOpen = false;
    }
  };

  var pageInit = function () {
    pinFlagOpen = true;
    mapPinMain.addEventListener('mousedown', onPageOpen);
    document.addEventListener('keydown', onEnterPageOpen);
  };

  pageInit();
})();
