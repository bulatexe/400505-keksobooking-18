'use strict';

(function() {

let addForm = document.querySelector('.ad-form')
let selectType = document.getElementById('type')
let bookingPrice = document.getElementById('price')
let roomSelect = document.getElementById('room_number')
let capacitySelect = document.getElementById('capacity')
let capacitySelectOptions = document.getElementById('capacity').querySelectorAll('option')
let avatarInput = document.getElementById('avatar')
let addPhotoBookingImgInput = document.getElementById('images')
let addPhotoBookingImg = document.querySelector('.ad-form-header__preview img')
let formPhotoContainer = document.querySelector('.ad-form__photo')
let createdBookings = []


let onInitForm = () => {
  bookingPrice.min = 1000

}

let changePrice = () => {
  if (selectType.value === 'bungalo') {
    bookingPrice.min = 0
    bookingPrice.placeholder = 0
  }

  if (selectType.value === 'flat') {
    bookingPrice.min = 1000
    bookingPrice.placeholder = 1000
  }

  if (selectType.value === 'house') {
    bookingPrice.min = 5000
    bookingPrice.placeholder = 5000
  }

  if (selectType.value === 'palace') {
    bookingPrice.min = 10000
    bookingPrice.placeholder = 10000
  }
}

let resetOptions = () => {
  capacitySelectOptions.forEach(option => {
    option.disabled = false
  })
}

let changeGuests = () => {
  resetOptions()
  capacitySelectOptions.forEach(option => {
    if (Number(roomSelect.value) < Number(option.value) || Number(option.value) === 0) {
      option.disabled = true
    } else {
      capacitySelect.value = option.value
    }
    if (Number(roomSelect.value) === 100) {
      if (Number(option.value) === 0) {
        option.disabled = false
        capacitySelect.value = option.value
      } else {
        option.disabled = true
      }
    }
  })
}

let validityGuestCount = (evt) => {
  if (Number(evt.target.value) < Number(bookingPrice.min)) {
    bookingPrice.setCustomValidity(`Цена должна быть больше или равно ${bookingPrice.min}`)
  } else {
    bookingPrice.setCustomValidity('')
  }
}

let readFile = function (img, fileInput) {
  let reader = new FileReader()
  reader.addEventListener('load', function(evt) {
    img.src = evt.target.result
  })

  reader.readAsDataURL(fileInput.files[0])
}

let createPhotoBooking = function () {
  let imageElem = document.createElement('img')
  imageElem.width = 40
  imageElem.height = 40

  readFile(imageElem, this)

  formPhotoContainer.appendChild(imageElem)
}

avatarInput.addEventListener('change', function() {
  readFile(addPhotoBookingImg, this)
})


addForm.addEventListener('submit', function(evt) {
  evt.preventDefault()
  let features = []
  let bookingImages = []
  let formData = Object.values(this).reduce((obj, field) => {
    obj[field.name] = field.value
    if (field.name === 'features') {
      if (field.checked === true) {
        features.push(field.value)
      }
      obj[field.name] = features
    }
    if (field.name === 'images') {
      document.querySelectorAll('.ad-form__photo img').forEach(img => {
        bookingImages.push(img.src)
      })

      obj[field.name] = bookingImages
    }
    if (field.name === 'avatar') {
      obj[field.name] = document.querySelector('.ad-form-header__preview img').src
    }
    return obj
  }, {})

  let offer = {
    author: {
      avatar: formData.avatar
    },
    location: {
      x: Number(formData.address.split(',')[0]),
      y: Number(formData.address.split(',')[1])
    },
    offer: {
      address: formData.address,
      checkin: formData.timein,
      checkout: formData.timeout,
      description: formData.description,
      features: formData.features,
      guests: Number(formData.capacity),
      photos: formData.images,
      price: Number(formData.price),
      rooms: Number(formData.rooms),
      title: formData.title,
      type: formData.type
    }
  }

  createdBookings.push(offer)

  window.renderBooking(undefined, createdBookings)
  window.filterData(true, createdBookings)
})


addPhotoBookingImgInput.addEventListener('change', createPhotoBooking)


bookingPrice.addEventListener('input', validityGuestCount)

selectType.addEventListener('change', changePrice)
roomSelect.addEventListener('change', changeGuests)

onInitForm()
changeGuests()

})()
