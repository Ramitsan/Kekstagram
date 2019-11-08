'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var uploadSubmitElement = document.querySelector('#upload-submit');
  var formUpload = document.querySelector('.img-upload__form');
  var commentTextareaElement = document.querySelector('.text__description');


  window.form = {
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    uploadCancelElement: uploadCancelElement,
    uploadSubmitElement: uploadSubmitElement,
    formUpload: formUpload,
    commentTextareaElement: commentTextareaElement
  };

  // var resetUploadFileHandler = function () {
  //   uploadFile.value = null;
  // };


  var resetFormHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.getOriginSlider();
  };

  // открытие и закрытие окна редактирования фото
  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    window.getOriginSlider();

  });


  uploadCancelElement.addEventListener('click', function () {
    resetFormHandler();
  });


  // закрытие по клавише ESC
  document.addEventListener('keydown', function () {
    if (window.pressEsc) {
      resetFormHandler();
    }
  });

  // если фокус в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  window.hashtags.hashtagInputElement.addEventListener('keydown', function (evt) {
    if (window.pressEsc) {
      evt.stopPropagation();
    }
  });

  // если фокус в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  commentTextareaElement.addEventListener('keydown', function (evt) {
    if (window.pressEsc) {
      evt.stopPropagation();
    }
  });

  // Отправить форму при нажатии на enter
  uploadSubmitElement.addEventListener('keydown', function () {
    if (window.pressEnter) {
      imgUploadOverlay.submit();
    }
  });


  // отправка данных на сервер
  var success = document.querySelector('#success').content.querySelector('.success');
  var successButtonElement = success.querySelector('.success__button');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorButtonElement = error.querySelector('.error__button');
  // var buttonSubmit = document.querySelector('.img-upload__submit');
  var successElement;
  var errorElement;


  var onResponse = function () {
    imgUploadOverlay.classList.add('hidden');
  };

  // обработчик успешной загрузки
  var successSaveHandler = function () {
    onResponse();
    uploadFile.setAttribute('value', null);
    success.style.zIndex = '100';
    document.querySelector('main').appendChild(success);
    successElement = document.querySelector('.success');
  };

  // закрытие окна успешной загрузки по клику
  successButtonElement.addEventListener('click', function () {
    success.remove();
  });

  // по ESC
  document.addEventListener('keydown', function () {
    if (window.pressEsc) {
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
    if (window.pressEsc) {
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
  formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (formUpload.checkValidity()) {
      window.backend.save(new FormData(formUpload), successSaveHandler, errorSaveHandler);
    }
  });

})();
