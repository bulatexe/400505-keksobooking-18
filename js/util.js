'use strict';

window.util = (function () {
  const ENTER_KEYDOWN = 13;
  const ESC_KEYDOWN = 27;


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
    }
  };
})();