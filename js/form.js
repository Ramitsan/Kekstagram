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

  // перемещение ползунка слайдера
  var effectLevelValue = document.querySelector('.effect-level__value');
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderEffectDepth = document.querySelector('.effect-level__depth');
  var EFFECT_MAX_VALUE = 100;

  // var filterSaturationLevelDefault = 100;
  // var sliderWidth = 495;
  // var sliderPadding = 20;


  // установка значения слайдера по дефолту
  var getDefaultSlider = function () {
    sliderPin.style.left = EFFECT_MAX_VALUE + '%';
    sliderEffectDepth.style.width = EFFECT_MAX_VALUE + '%';
    effectLevelValue.value = EFFECT_MAX_VALUE;
  };


  // максимальные значения фильтров по дефолту
  var getDefaultFilterMax = function () {
    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style.filter = 'grayscale(' + FILTER_DEFAULT.chrome + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style.filter = 'sepia(' + FILTER_DEFAULT.sepia + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style.filter = 'marvin(' + FILTER_DEFAULT.marvin + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style.filter = 'phobos(' + FILTER_DEFAULT.phobos + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style.filter = 'brightness(' + FILTER_DEFAULT.heat + ')';
    }
  };

  // пропорция
  var getProportion = function (paramOne, paramTwo) {
    return (paramOne / paramTwo).toFixed(1);
  };


  // функция установки интенсивности фильтров
  var changeIntensityFilters = function () {

    var sliderPinRadius = sliderPin.offsetWidth / 2;
    var sliderPinPosition = sliderPin.offsetLeft - sliderPinRadius;
    var sliderLineWidth = sliderLine.offsetWidth;

    // находим коэффициент изменения интенсивности
    var rateIntensityFilter = getProportion(sliderPinPosition, sliderLineWidth);

    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.chrome;
      imgUploadPreview.style.filter = 'grayscale(' + effectLevelValue.value + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.sepia;
      imgUploadPreview.style.filter = 'sepia(' + effectLevelValue.value + ')';
    }
    if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.marvin;
      imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
    }
    if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.phobos;
      imgUploadPreview.style.filter = 'blur(' + effectLevelValue.value + 'px)';
    }
    if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.heat;
      imgUploadPreview.style.filter = 'brightness(' + effectLevelValue.value + ')';
    }
  };

  // перемещение ползунка слайдера
  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      formUpload.removeEventListener('mousemove', onMouseMove);
      formUpload.removeEventListener('mouseup', onMouseUp);
    };

    formUpload.addEventListener('mousemove', onMouseMove);
    formUpload.addEventListener('mouseup', onMouseUp);
  });

  // валидация хэш-тегов
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var MAX_HASHTEGS = 5;
  var MAX_HASHTEGS_LENGTH = 20;


  // функция проверки хэштегов
  var hashtagsValidation = function (target, value) {
    var arrHashtags = value.split(' ', MAX_HASHTEGS);

    for (var i = 0; i < arrHashtags.length; i++) {
      var hashtag = arrHashtags[i];

      switch (true) {
        case hashtag[0] !== '#':
          target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
          break;
        case hashtag === '#' && hashtag.length === 1:
          target.setCustomValidity('Хештег не может состоять только из одной решётки');
          break;
        case arrHashtags.length > MAX_HASHTEGS:
          target.setCustomValidity('Количество хэштегов не должно превышать ' + MAX_HASHTEGS);
          break;
        case hashtag.length > MAX_HASHTEGS_LENGTH:
          target.setCustomValidity('Хэштег не должен превышать ' + MAX_HASHTEGS_LENGTH + ' символов');
          break;
        default:
          target.setCustomValidity('');
      }
    }
  };

  textHashtagsInput.addEventListener('input', function (evt) {
    var hashtagValue = textHashtagsInput.value.toLowerCase();
    var target = evt.target;

    hashtagsValidation(target, hashtagValue);
  });


})();
