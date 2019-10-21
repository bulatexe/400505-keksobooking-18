'use strict';

(function () {
  var RoomsRange = {
    min: 0,
    max: 100
  };

  var BookingTypesRange = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0'
  };

  var selectRooms = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var selectRoomsValue;
  var selectCapacityValue;
  var selectType = document.querySelector('#type');

  var inputPrice = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');

  var mainFormSubmit = document.querySelector('.ad-form__submit');

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
    var minPrice = BookingTypesRange[evt.target.value];

    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  var onTimeInChange = function (evt) {
    timeOutInput.value = evt.target.value;
  };

  var onTimeOutChange = function (evt) {
    timeInInput.value = evt.target.value;
  };

  var checkValidity = function () {
    selectRoomsValidation();
  };

  mainFormSubmit.addEventListener('click', checkValidity);
  selectType.addEventListener('change', onTypeChange);
  timeInInput.addEventListener('change', onTimeInChange);
  timeOutInput.addEventListener('change', onTimeOutChange);
})();