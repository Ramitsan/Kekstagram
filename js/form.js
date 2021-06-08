'use strict';

(() => {

  const uploadFile = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  const uploadCancelElement = document.querySelector('#upload-cancel');
  const uploadSubmitElement = document.querySelector('#upload-submit');
  const formUpload = document.querySelector('.img-upload__form');
  const commentTextareaElement = document.querySelector('.text__description');

  const resetFormHandler = () => {
    imgUploadOverlay.classList.add('hidden');
    window.getOriginSlider();
    window.hashtags.hashtagInputElement.style.borderColor = '';
    window.hashtags.hashtagInputElement.setCustomValidity('');
    formUpload.reset();
  };

  uploadCancelElement.addEventListener('click', () => {
    resetFormHandler();
  });

  // закрытие по клавише ESC
  document.addEventListener('keydown', (e) => {
    if (window.util.pressEsc(e)) {
      resetFormHandler();
    }
  });

  // если фокус в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  window.hashtags.hashtagInputElement.addEventListener('keydown', (evt) => {
    if (window.util.pressEsc) {
      evt.stopPropagation();
    }
  });

  // если фокус в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  commentTextareaElement.addEventListener('keydown', (evt) => {
    if (window.util.pressEsc) {
      evt.stopPropagation();
    }
  });

  // Отправить форму при нажатии на enter
  uploadSubmitElement.addEventListener('keydown', () => {
    if (window.util.pressEnter) {
      imgUploadOverlay.submit();
    }
  });

  window.form = {
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    formUpload: formUpload,
    resetFormHandler: resetFormHandler,
    uploadSubmitElement: uploadSubmitElement
  };

})();