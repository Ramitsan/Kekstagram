'use strict';

(() => {
  // отправка данных на сервер
  const success = document.querySelector('#success').content.querySelector('.success');
  const successButtonElement = success.querySelector('.success__button');
  const error = document.querySelector('#error').content.querySelector('.error');
  const errorButtonElement = error.querySelector('.error__button');
  let successElement;
  let errorElement;

  const responseFormHandler = () => {
    window.form.imgUploadOverlay.classList.add('hidden');
    window.form.uploadFile.setAttribute('value', null);
    window.form.resetFormHandler();
  };

  // обработчик успешной загрузки
  const successSaveHandler = () => {
    responseFormHandler();
    document.querySelector('main').appendChild(success);
    successElement = document.querySelector('.success');
  };

  // закрытие окна успешной загрузки по клику
  successButtonElement.addEventListener('click', () => {
    success.remove();
  });

  // по ESC
  document.addEventListener('keydown', () => {
    if (window.util.pressEsc) {
      success.remove();
    }
  });

  // по клику на произвольной области
  success.addEventListener('click', (e) => {
    if (e.target === successElement) {
      success.remove();
    }
  });

  // обработчик ошибки
  const errorSaveHandler = () => {
    responseFormHandler();
    document.querySelector('main').appendChild(error);
    errorElement = document.querySelector('.error');
  };

  // закрытие окна об ошибке по клику
  errorButtonElement.addEventListener('click', () => {
    error.remove();
  });

  // по ESC
  document.addEventListener('keydown', () => {
    if (window.util.pressEsc) {
      error.remove();
    }
  });

  // по клику на произвольной области
  error.addEventListener('click', (e) => {
    if (e.target === errorElement) {
      error.remove();
    }
  });

  // отправка данных формы
  window.form.formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (window.form.formUpload.checkValidity()) {
      window.backend.save(new FormData(window.form.formUpload), successSaveHandler, errorSaveHandler);
    }
  });

  window.load = {
    responseFormHandler: responseFormHandler,
    error: error
  };

})();