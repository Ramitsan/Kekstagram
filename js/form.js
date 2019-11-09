'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var uploadSubmitElement = document.querySelector('#upload-submit');
  var formUpload = document.querySelector('.img-upload__form');
  var commentTextareaElement = document.querySelector('.text__description');


  // открытие и закрытие окна редактирования фото
  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    window.getOriginSlider();
  });

  var resetFormHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.getOriginSlider();
    window.hashtags.hashtagInputElement.style.borderColor = '';
    formUpload.reset();
  };


  uploadCancelElement.addEventListener('click', function () {
    resetFormHandler();
  });


  // закрытие по клавише ESC
  document.addEventListener('keydown', function (e) {
    if (window.util.pressEsc(e)) {
      resetFormHandler();
    }
  });

  // если фокус в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  window.hashtags.hashtagInputElement.addEventListener('keydown', function (evt) {
    if (window.util.pressEsc) {
      evt.stopPropagation();
    }
  });

  // если фокус в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  commentTextareaElement.addEventListener('keydown', function (evt) {
    if (window.util.pressEsc) {
      evt.stopPropagation();
    }
  });

  // Отправить форму при нажатии на enter
  uploadSubmitElement.addEventListener('keydown', function () {
    if (window.util.pressEnter) {
      imgUploadOverlay.submit();
    }
  });

  window.form = {
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    formUpload: formUpload,
    resetFormHandler: resetFormHandler
  };


})();
