'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 80;

  var pinFlagOpen = false;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var inputAddress = document.querySelector('#address');

  var MainPinCoords = {
    x: 570,
    y: 375
  };

  mapPinMain.onmousedown = function (evt) {
    evt.preventDefault();
    mapPinMain.style.position = 'absolute';

    var shift = {
      x: evt.clientX - mapPinMain.getBoundingClientRect().left,
      y: evt.clientY - mapPinMain.getBoundingClientRect().top
    };

    // eslint-disable-next-line no-shadow
    var onMouseMove = function (evt) {
      var newLeft = evt.clientX - shift.x - mapPins.getBoundingClientRect().left;
      var newTop = evt.clientY - shift.y - mapPins.getBoundingClientRect().top;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newTop < 0) {
        newTop = 0;
      }

      var rightEdge = mapPins.offsetWidth - mapPinMain.offsetWidth;
      var bottomEdge = mapPins.offsetHeight - MAIN_PIN_HEIGHT;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop > bottomEdge) {
        newTop = bottomEdge;
      }

      mapPinMain.style.left = newLeft + 'px';
      mapPinMain.style.top = newTop + 'px';

      inputAddress.value = newLeft + ', ' + newTop;
    };

    var onMouseUp = function () {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onEnterMapOpen = function (evt) {
    window.util.isEnterEvent(evt, onMapOpen);
  };

  var onMapOpen = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    inputAddress.value = MainPinCoords.x + ', ' + MainPinCoords.y;
    document.removeEventListener('keydown', onEnterMapOpen);
    if (pinFlagOpen === true) {
      window.renderBookingPinAds();
      pinFlagOpen = false;
    }
  };

  var mapInit = function () {
    pinFlagOpen = true;
    mapPinMain.addEventListener('mousedown', onMapOpen);
    document.addEventListener('keydown', onEnterMapOpen);
  };

  mapInit();
})();
