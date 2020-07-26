'use strict';

(function() {
  let pinFragment = document.createDocumentFragment();
  let cardFragment = document.createDocumentFragment();
  let pinBokingTemplate = document.querySelector('#pin').content;
  let cardTemplate = document.querySelector('#card').content;
  let mapPins = document.querySelector('.map__pins');
  let modalTemplate = document.querySelector('#modal').content
  let cardIsOpenFlag = false;
  let modalIsOpen = false;
  let bookingTypeFilterSelect = document.getElementById('housing-type')
  let priceFilterSelect = document.getElementById('housing-price')
  let roomsFilterSelect = document.getElementById('housing-rooms')
  let guestsFilterSelect = document.getElementById('housing-guests')
  let wifiFilterElement = document.getElementById('filter-wifi')
  let dishwasherFilterElement = document.getElementById('filter-dishwasher')
  let parkingFilterElement = document.getElementById('filter-parking')
  let washerFilterElement = document.getElementById('filter-washer')
  let elevatorFilterElement = document.getElementById('filter-elevator')
  let conditionerFilterElement = document.getElementById('filter-conditioner')
  let newDataArray = []


  let BookingTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  }

  window.renderBooking = (dataFilterd, newOffer) => {
    window.requestCards().then(data => {
      try {
        if (dataFilterd !== undefined) {
          data = dataFilterd
        }
        if (newOffer) {
          let dataCopy = data.concat(newOffer)
          data = dataCopy
        }
        if (document.querySelector('.map__pin:not(.map__pin--main)') !== undefined) {
          let pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')
          pins.forEach(pin => {
            pin.remove()
          })
        }
        document.querySelectorAll('.map')
        data.forEach((element, index) => {
          let pin = pinBokingTemplate.cloneNode(true)
          pin.querySelector('.map__pin').dataset.index = index
          pin.querySelector('.map__pin').style.left = element.location.x + 'px'
          pin.querySelector('.map__pin').style.top = element.location.y + 'px'
          pin.querySelector('img').src = element.author.avatar


          pinFragment.appendChild(pin)

        });

        mapPins.appendChild(pinFragment)

        let pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')
        let removeCard = () => {
          let card = document.querySelector('.map__card.popup')
          removeModal()
          card.remove()
          cardIsOpenFlag = false
        }
        let removeModal = () => {
          let modal = document.querySelector('.modal')
          if (modal !== null) {
            modal.remove()
          }
          modalIsOpen = false
        }
        let showModalPhoto = (evt) => {
          if (modalIsOpen) {
            removeModal()
          }
          let modal = modalTemplate.cloneNode(true)
          let fragment = document.createDocumentFragment()
          modal.querySelector('.modal__photo').src =  evt.target.src
          let modalClose = modal.querySelector('.modal .popup__close')
          modalClose.addEventListener('click', removeModal)


          fragment.appendChild(modal)

          mapPins.appendChild(fragment)

          modalIsOpen = true
        }

        let showCard = (evt) => {
          if (cardIsOpenFlag) {
            removeCard()
          }
          if (modalIsOpen) {
            removeModal()
          }
          let card = cardTemplate.cloneNode(true);
          let cardIndex = null;
          if (evt.target.parentNode.className === 'map__pin') {
            cardIndex = Number(evt.target.parentNode.dataset.index)
          } else {
            cardIndex = Number(evt.target.dataset.index)
          }


          card.querySelector('.popup__avatar').src = data[cardIndex].author.avatar
          card.querySelector('.popup__title').textContent = data[cardIndex].offer.title
          card.querySelector('.popup__text.popup__text--address').textContent = data[cardIndex].offer.address
          card.querySelector('.popup__text.popup__text--price').textContent = data[cardIndex].offer.price + '₽'
          card.querySelector('.popup__type').textContent = BookingTypes[data[cardIndex].offer.type]
          card.querySelector('.popup__text.popup__text--capacity').textContent = `${data[cardIndex].offer.rooms} комнаты для ${data[cardIndex].offer.guests} гостей`
          card.querySelector('.popup__text.popup__text--time').textContent = `Заезд после ${data[cardIndex].offer.checkin}, выезд до ${data[cardIndex].offer.checkout}`
          card.querySelector('.popup__description').textContent = data[cardIndex].offer.description


          let copyViewNodes = (parentNode, childNode, flagFeatures) => {
            let child = childNode.cloneNode()
            let fragment = document.createDocumentFragment()
            let parent = parentNode

            fragment.appendChild(child)
            parent.textContent = ''

            if (flagFeatures) {
              data[cardIndex].offer.features.forEach(feature => {
                let childCopy = fragment.firstChild.cloneNode(true)
                childCopy.className = `popup__feature popup__feature--${feature}`
                parent.appendChild(childCopy)
              })
            } else {
              data[cardIndex].offer.photos.forEach(photo => {
                let childCopy = fragment.firstChild.cloneNode(true)
                childCopy.src = photo
                card.querySelector('.popup__photos').appendChild(childCopy)
                parent.appendChild(childCopy)

              })
            }
          }

          copyViewNodes(card.querySelector('.popup__features'), card.querySelector('.popup__features li'), true)
          copyViewNodes(card.querySelector('.popup__photos'), card.querySelector('.popup__photo'))

          let bookingPhotos = card.querySelectorAll('.popup__photo')

          bookingPhotos.forEach(bookingPhoto => {
            bookingPhoto.addEventListener('click', showModalPhoto)
          })

          cardFragment.appendChild(card)

          mapPins.appendChild(cardFragment)

          cardIsOpenFlag = true

          let closeCardBtn = document.querySelector('.popup__close')
          closeCardBtn.addEventListener('click', removeCard)
        }

        pins.forEach(pin => {
          pin.addEventListener('click', showCard)
        })

      } catch(err) {
        console.log(err)
      }
    })
  }

  let priceFilter = {
    startEdge: 10000,
    endEdge: 50000
  }

  Array.prototype.filterDataByType = function(type, filterBy, numberValues) {
    if (filterBy === 'any') {
      return this
    }

    if (numberValues) {
      filterBy = Number(filterBy)
    }

    return this.filter(elem => elem.offer[type] === filterBy)
  }

  Array.prototype.filterDataByPrice = function(filterBy) {
    if (filterBy === 'any') {
      return this
    }

    if (filterBy === 'low') {
      return this.filter(elem => elem.offer.price < priceFilter.startEdge)
    }

    if  (filterBy === 'middle') {
      return this.filter(elem => elem.offer.price >= priceFilter.startEdge && elem.offer.price <= priceFilter.endEdge)
    }

    if (filterBy === 'high') {
      return this.filter(elem => elem.offer.price > priceFilter.endEdge)
    }
  }

  Array.prototype.filterByFeature = function(checkboxElem) {
    if (checkboxElem.checked) {
      return this.filter(elem => elem.offer.features.includes(checkboxElem.value))
    } else {
      return this
    }
  }

  window.filterData = (hasCreated, newData) => {
    let hasCreatedFlag = false
    if (newData !== undefined) {
      newDataArray = newData
    }

    if (hasCreated) {
      hasCreatedFlag = true
    }

    window.requestCards().then(data => {
      try {
        if (hasCreatedFlag && newDataArray !== undefined) {
          data = data.concat(newDataArray)
        }

        console.log(data)
        let filteredData = data.filterDataByType('type', bookingTypeFilterSelect.value)
          .filterDataByPrice(priceFilterSelect.value)
          .filterDataByType('rooms', roomsFilterSelect.value)
          .filterDataByType('guests', guestsFilterSelect.value, true)
          .filterByFeature(wifiFilterElement)
          .filterByFeature(dishwasherFilterElement)
          .filterByFeature(parkingFilterElement)
          .filterByFeature(washerFilterElement)
          .filterByFeature(elevatorFilterElement)
          .filterByFeature(conditionerFilterElement)

        renderBooking(filteredData)
      } catch (error) {
        console.log(error, 'error')
      }
    })
  }

  bookingTypeFilterSelect.addEventListener('change', filterData)
  priceFilterSelect.addEventListener('change', filterData)
  roomsFilterSelect.addEventListener('change', filterData)
  guestsFilterSelect.addEventListener('change', filterData)
  wifiFilterElement.addEventListener('change', filterData)
  dishwasherFilterElement.addEventListener('change', filterData)
  parkingFilterElement.addEventListener('change', filterData)
  washerFilterElement.addEventListener('change', filterData)
  elevatorFilterElement.addEventListener('change', filterData)
  conditionerFilterElement.addEventListener('change', filterData)

})()
