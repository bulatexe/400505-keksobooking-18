'use strict';

(function () {
    const url = 'https://javascript.pages.academy/keksobooking/data'

    window.requestCards = async () => {
        let response = await fetch(url)
        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа
            let data = await response.json();
            return data
          } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    window.toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
})()


