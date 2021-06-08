'use strict';

(() => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const uploadFileElement = document.querySelector('input#upload-file');
  const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  const effectsPreviewCollection = document.querySelectorAll('.effects__list .effects__preview');
  let errorFormatElement;


  uploadFileElement.addEventListener('change', () => {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();
    const typeCoincidence = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    const errorFormatHandler = () => {
      window.load.responseFormHandler();
      document.querySelector('main').appendChild(window.load.error);
      errorFormatElement = document.querySelector('.error');
      const errorTitle = errorFormatElement.querySelector('.error__title');
      errorTitle.textContent = 'Неверный формат изображения';
      const errorButtons = errorFormatElement.querySelector('.error__buttons');
      const errorButton = errorFormatElement.querySelectorAll('.error__button');
      errorButtons.removeChild(errorButton[1]);
      errorButton[0].textContent = `Выбрать изображение другого формата`;
      errorButton[0].style.padding = '15px';
    };

    if (typeCoincidence) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
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
  const getPreviewImage = (src) => {
    effectsPreviewCollection.forEach((it) => {
      it.style.backgroundImage = `url(${src})`;
    });
  };
})();
