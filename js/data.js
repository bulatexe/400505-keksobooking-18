'use strict';

(function () {
  var MAX_ADS = 8;

  var RoomsRange = {
    min: 0,
    max: 100
  };

  var GuestsRange = {
    min: 0,
    max: 3
  };

  var html = document.querySelector('html');
  var map = document.querySelector('.map');
  var mapGap = (html.offsetWidth - map.offsetWidth) / 2;

  var createLocationX = function () {
    return window.util.getRandomInt(mapGap, map.offsetWidth - 50);
  };

  var createLocationY = function () {
    return window.util.getRandomInt(130, 630);
  };

  var createBookingAd = function (index) {

    return {
      'author': 'img/avatars/user0' + (index + 1) + '.png',
      'offer': {
        'title': window.mock.offerTitles[index],
        'address': createLocationX() + ', ' + createLocationY(),
        'price': window.mock.prices[index],
        'type':
          window.mock.bookingTypes[
            window.util.getRandomInt(0, window.mock.bookingTypes.length)
          ],
        'rooms': window.util.getRandomInt(RoomsRange.min, RoomsRange.max),
        'guests': window.util.getRandomInt(GuestsRange.min, GuestsRange.max),
        'checkin':
          window.mock.checks[
            window.util.getRandomInt(0, window.mock.checks.length)
          ],
        'checkout':
          window.mock.checks[
            window.util.getRandomInt(0, window.mock.checks.length)
          ],
        'features':
          window.mock.features[
            window.util.getRandomInt(0, window.mock.features.length)
          ],
        'description': window.mock.descriptions[index],
        'photos': window.mock.photos
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

  window.bookingAds = createBookingAds();
})();
