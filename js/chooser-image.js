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
