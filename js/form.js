'use strict';

(function () {

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
var uploadCancel = document.querySelector('#upload-cancel');
var uploadSubmit = document.querySelector('#upload-submit');
var formUpload = document.querySelector('.img-upload__form');
var effectLevelSlider = document.querySelector('.effect-level');


// открытие и закрытие окна редактирования фото
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  effectLevelSlider.classList.add('hidden');
  defaultSettings();
});

uploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

// закрытие по клавише ESC
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== textHashtagsInput) {
    imgUploadOverlay.classList.add('hidden');
  }
});

// Отправить форму при нажатии на enter
uploadSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    imgUploadOverlay.submit();
  }
});

// масштабирование
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value'); // инпут
var imgUploadPreview = document.querySelector('.img-upload__preview'); // предварительный просмотр изображения
var stepResize = 25;
var minSize = 25;
var maxSize = 100;
var defoltSize = 100;
var scaleControlValueNumber = defoltSize; // значение масштаба в текущий момент

// показатель масштаба при открытии фотографии
var scaleIndicatorDefault = function () {
  scaleControlValue.value = defoltSize + '%';
};
scaleIndicatorDefault();


// уменьшение масштаба изображения
var controlSmallerHandler = function () {
  if (scaleControlValueNumber <= maxSize && scaleControlValueNumber > minSize) {
    scaleControlValueNumber -= stepResize;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// увеличение масштаба изображения
var controlBiggerHandler = function () {
  if (scaleControlValueNumber >= minSize && scaleControlValueNumber < maxSize) {
    scaleControlValueNumber += stepResize;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// показ измененного масштаба изображения
var resize = function () {
  imgUploadPreview.classList.remove('scale-25', 'scale-50', 'scale-75', 'scale-100');
  imgUploadPreview.classList.add('scale-' + scaleControlValueNumber);
};

var photoSmaller = function () {
  controlSmallerHandler();
  resize();
};

var photoBigger = function () {
  controlBiggerHandler();
  resize();
};

scaleControlSmaller.addEventListener('click', photoSmaller);
scaleControlBigger.addEventListener('click', photoBigger);

// применение фильтров
var uploadPhoto = document.querySelector('.img-upload__preview img');
var effectsLabels = document.querySelectorAll('.effects__label');

var FILTER_DEFAULT = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3
};

// функция сброса всех значений
var defaultSettings = function () {
  imgUploadPreview.classList.add('scale-' + defoltSize);
  resetEffect();
  scaleIndicatorDefault();
};


// добавляем класс для фото соответственно выбранному фильтру
var getClassName = function (evt) {
  var filterName = evt.target.parentNode.htmlFor;

  if (filterName === 'effect-none') {
    uploadPhoto.classList.add('effects__preview--none');
  }
  if (filterName === 'effect-chrome') {
    uploadPhoto.classList.add('effects__preview--chrome');
  }
  if (filterName === 'effect-sepia') {
    uploadPhoto.classList.add('effects__preview--sepia');
  }
  if (filterName === 'effect-marvin') {
    uploadPhoto.classList.add('effects__preview--marvin');
  }
  if (filterName === 'effect-phobos') {
    uploadPhoto.classList.add('effects__preview--phobos');
  }
  if (filterName === 'effect-heat') {
    uploadPhoto.classList.add('effects__preview--heat');
  }
};


// функция скрытия слайдера, если выбран эффект «Оригинал»
var sliderHidden = function (evt) {
  var filterName = evt.target.parentNode.htmlFor;
  if (filterName === 'effect-none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }
};

// Функция удаления добавленных классов
var resetEffect = function () {
  uploadPhoto.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
};


// функция добавления фильтров на фото
var toggleFilter = function (arr) {
  for (var i = 0; i < arr.length; i++) {

    arr[i].addEventListener('click', function (evt) {
      resetEffect();
      getDefaultSlider();
      sliderHidden(evt);

      // добавление класса фильтра
      imgUploadPreview.classList.add(getClassName(evt));
      getDefaultFilterMax();

      // меняем интенсивность фильтра
      sliderPin.addEventListener('mouseup', function () {
        changeIntensityFilters();
      });
    });
  }
};

toggleFilter(effectsLabels);

})();
