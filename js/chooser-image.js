'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFileElement = document.querySelector('input#upload-file');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewCollection = document.querySelectorAll('.effects__list .effects__preview');
  var errorFormatElement;


  uploadFileElement.addEventListener('change', function () {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();
    var typeCoincidence = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var errorFormatHandler = function () {
      window.load.responseFormHandler();
      document.querySelector('main').appendChild(window.load.error);
      errorFormatElement = document.querySelector('.error');
      var errorTitle = errorFormatElement.querySelector('.error__title');
      errorTitle.textContent = 'Неверный формат изображения';
      var errorButtons = errorFormatElement.querySelector('.error__buttons');
      var errorButton = errorFormatElement.querySelectorAll('.error__button');
      errorButtons.removeChild(errorButton[1]);
      errorButton[0].textContent = 'Выбрать изображение другого формата';
      errorButton[0].style.padding = '15px';
    };

    if (typeCoincidence) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgUploadPreviewElement.src = reader.result;
        getPreviewImage(reader.result);
      });
      reader.readAsDataURL(file);

      window.form.imgUploadOverlay.classList.remove('hidden');
      window.getOriginSlider();
    } else {
      errorFormatHandler();
    }
  });
  var getPreviewImage = function (src) {
    effectsPreviewCollection.forEach(function (it) {
      it.style.backgroundImage = 'url(' + src + ')';
    });
  };
})();
