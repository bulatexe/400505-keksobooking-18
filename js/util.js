'use strict';

window.util = (function () {
  var ENTER_KEYDOWN = 13;
  var ESC_KEYDOWN = 27;


  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYDOWN) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYDOWN) {
        action();
      }
    },
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
