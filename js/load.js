'use strict';

(function () {

  // отправка данных на сервер
  var success = document.querySelector('#success').content.querySelector('.success');
  var successButtonElement = success.querySelector('.success__button');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorButtonElement = error.querySelector('.error__button');
  var successElement;
  var errorElement;

  var onResponse = function () {
    window.form.imgUploadOverlay.classList.add('hidden');
    window.form.uploadFile.setAttribute('value', null);
    window.form.resetFormHandler();
  };

  // обработчик успешной загрузки
  var successSaveHandler = function () {
    onResponse();
    document.querySelector('main').appendChild(success);
    successElement = document.querySelector('.success');
  };

  // закрытие окна успешной загрузки по клику
  successButtonElement.addEventListener('click', function () {
    success.remove();
  });

  // по ESC
  document.addEventListener('keydown', function () {
    if (window.util.pressEsc) {
      success.remove();
    }
  });

  // по клику на произвольной области
  success.addEventListener('click', function (e) {
    if (e.target === successElement) {
      success.remove();
    }
  });

  // обработчик ошибки
  var errorSaveHandler = function () {
    onResponse();
    document.querySelector('main').appendChild(error);
    errorElement = document.querySelector('.error');
  };

  // закрытие окна об ошибке по клику
  errorButtonElement.addEventListener('click', function () {
    error.remove();
  });

  // по ESC
  document.addEventListener('keydown', function () {
    if (window.util.pressEsc) {
      error.remove();
    }
  });

  // по клику на произвольной области
  error.addEventListener('click', function (e) {
    if (e.target === errorElement) {
      error.remove();
    }
  });

  // отправка данных формы
  window.form.formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.form.formUpload.checkValidity()) {
      window.backend.save(new FormData(window.form.formUpload), successSaveHandler, errorSaveHandler);
    }
  });

})();
