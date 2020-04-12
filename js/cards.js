'use strict';

(function() {
    let mapPinds = document.querySelector('.map__pins')
    let cards = window.requestCards()
    let cardTepmplate = document.querySelector('#card')
    let cloneCard = cardTepmplate.content.cloneNode(true);

    let getTypeCard = (string) => {
        switch (string) {
            case 'house':
                return 'Дом'
            case 'flat':
                return 'Квартира'
            case 'bungalo':
                return 'Бунгало'
            case 'palace':
                return 'Дворец'    
        }

    }
    
    let renderCard = (cards) => {
        
    }

    
})()