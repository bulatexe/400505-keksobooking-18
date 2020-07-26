'use strict';

(function() {
    let mapPinHeigth = 80;
    let mapFlagOpen = false;
    let map = document.querySelector('.map');
    let mapPinMain = document.querySelector('.map__pin--main');
    let mapPins = document.querySelector('.map__pins');
    let mainForm = document.querySelector('.ad-form');
    let inputAddress = document.querySelector('#address');

    let MainPinCoords = {
        x: 570,
        y: 375
      };


    mapPinMain.addEventListener('mousedown', (evt) => {
        evt.preventDefault();
        mapPinMain.style.position = 'absolute';

        let shift = {
        x: evt.clientX - mapPinMain.getBoundingClientRect().left,
        y: evt.clientY - mapPinMain.getBoundingClientRect().top
        };


        let onMouseMove = (evt) => {
            let newLeft = evt.clientX - shift.x - mapPins.getBoundingClientRect().left;
            let newTop = evt.clientY - shift.y - mapPins.getBoundingClientRect().top;

            if (newLeft < 0) {
            newLeft = 0;
            }

            if (newTop < 0) {
            newTop = 0;
            }

            let rightEdge = mapPins.offsetWidth - mapPinMain.offsetWidth;
            let bottomEdge = mapPins.offsetHeight - mapPinHeigth;

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

        let onMouseUp = function () {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    })

    let onEnterMapOpen = function (evt) {
        window.util.isEnterEvent(evt, onMapOpen);
      };

    window.onMapOpen = () => {
        mapFlagOpen = true;
        map.classList.remove('map--faded');
        mainForm.classList.remove('ad-form--disabled');
        document.removeEventListener('keydown', onEnterMapOpen);
        if (mapFlagOpen === true) {
          mapPinMain.removeEventListener('mouseup', onMapOpen);
          document.addEventListener('keydown', onEnterMapOpen);
        }
        window.renderBooking()
    }

    let mapInit = () => {
        mapPinMain.addEventListener('mouseup', onMapOpen);
        document.addEventListener('keydown', onEnterMapOpen);
        inputAddress.value = MainPinCoords.x + ', ' + MainPinCoords.y;
    }

    mapInit()
})()
