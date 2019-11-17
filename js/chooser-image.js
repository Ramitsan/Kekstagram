'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFileElement = document.querySelector('input#upload-file');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewCollection = document.querySelectorAll('.effects__list .effects__preview');
  var errorTitle = document.querySelector('.error__title');
  var errorFormatElement;


  uploadFileElement.addEventListener('change', function () {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();
    var typeCoincidence = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var errorFormatHandler = function () {
      document.querySelector('main').appendChild(error);
      errorFormatElement = document.querySelector('.error');
      console.log(errorFormatElement);
      console.log(errorTitle);
      // errorTitle.textContent = 'Неверный формат изображения';
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

      // uploadFileElement.setCustomValidity("Неверный формат изображения");
      // window.form.uploadSubmitElement.click();
    }
  });
  var getPreviewImage = function (src) {
    effectsPreviewCollection.forEach(function (it) {
      it.style.backgroundImage = 'url(' + src + ')';
    });
  };
})();
