'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');


  var createMessage = function (messageTemplate, closeElement) {

    var message = messageTemplate.cloneNode(true);

    main.appendChild(message);

    var onHideMessage = function () {
      message.classList.add('hidden');
      document.removeEventListener('keydown', onEscHideMessage);
    };

    var onEscHideMessage = function (evt) {
      window.util.isEscEvent(evt, onHideMessage);
    };

    if (closeElement !== undefined) {
      message.querySelector(closeElement).addEventListener('click', onHideMessage);
    } else {
      message.addEventListener('click', onHideMessage);
    }

    document.addEventListener('keydown', onEscHideMessage);

    return message;
  };

  window.showSuccessMessage = function () {
    createMessage(successMessageTemplate);
  };

  window.showErrorMessage = function (errorText) {
    var errorMessage = createMessage(errorMessageTemplate, '.error__button');

    errorMessage.querySelector('.error__message').textContent = errorText;
  };
})();
