'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadSubmit = document.querySelector('#upload-submit');
  var formUpload = document.querySelector('.img-upload__form');
  var commentInput = document.querySelector('.text__description');


  window.form = {
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    uploadCancel: uploadCancel,
    uploadSubmit: uploadSubmit,
    formUpload: formUpload,
    commentInput: commentInput
  };


  // открытие и закрытие окна редактирования фото
  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    window.filters.effectLevelSlider.classList.add('hidden');
    window.defaultSettings();
  });

  uploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
  });


  // закрытие по клавише ESC
  // не работает с window.pressEsc!!!
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      imgUploadOverlay.classList.add('hidden');
    }
  });

  // если фокус в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  window.hashtags.textHashtagsInput.addEventListener('keydown', function (evt) {
    if (window.pressEsc) {
      evt.stopPropagation();
    }
  });

  // если фокус в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  commentInput.addEventListener('keydown', function (evt) {
    if (window.pressEsc) {
      evt.stopPropagation();
    }
  });

  // Отправить форму при нажатии на enter
  uploadSubmit.addEventListener('keydown', function (evt) {
    if (window.pressEnter) {
      imgUploadOverlay.submit();
    }
  });


// отправка данных на сервер
var success = document.querySelector('#success').content.querySelector('.success');
var successButton = success.querySelector('.success__button');
var error = document.querySelector('#error').content.querySelector('.error');
var errorButton = error.querySelector('.error__button');
var buttonSubmit = document.querySelector('.img-upload__submit');



var onResponse = function() {
  imgUploadOverlay.classList.add('.hidden');
};

// обработчик успешной загрузки
var successSaveHandler = function() {
  onResponse();
  success.style.zIndex = '100';
  document.querySelector('main').appendChild(success);
};

// закрытие окна успешной загрузки по клику
successButton.addEventListener('click', function () {
  success.remove();
});

// по ESC
document.addEventListener('keydown', function(evt) {
  if (window.pressEsc) {
    success.remove();
  }
});

// по клику на произвольной области
success.addEventListener('click', function() {
  success.remove();
});


// обработчик ошибки
var errorSaveHandler = function() {
  onResponse();
  document.querySelector('main').appendChild(error);
};

// закрытие окна об ошибке по клику
errorButton.addEventListener('click', function() {
  error.remove();
});

// по ESC
document.addEventListener('keydown', function(evt) {
  if (window.pressEsc) {
    error.remove();
  }
});

// по клику на произвольной области
error.addEventListener('click', function() {
  error.remove();
});

// //отправка данных формы
//  var submitFormHandler = function () {
  formUpload.addEventListener('submit', function (evt) {
   evt.preventDefault();
   window.backend.save(new FormData(formUpload), successSaveHandler(), errorSaveHandler());
  });
// };


// buttonSubmit.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   window.backend.save(new FormData(formUpload), successSaveHandler, errorSaveHandler);
// });

// formUpload.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   window.backend.save(new FormData(formUpload), successSaveHandler, errorSaveHandler);
// });

})();
