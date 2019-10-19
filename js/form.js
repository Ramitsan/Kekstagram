'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadSubmit = document.querySelector('#upload-submit');
  var formUpload = document.querySelector('.img-upload__form');
  var effectLevelSlider = document.querySelector('.effect-level');
  var imgUploadPreview = document.querySelector('.img-upload__preview'); // предварительный просмотр изображения
  var uploadPhoto = document.querySelector('.img-upload__preview img');
  var effectsLabels = document.querySelectorAll('.effects__label');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var FILTER_DEFAULT = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };

  window.form = {
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    uploadCancel: uploadCancel,
    uploadSubmit: uploadSubmit,
    formUpload: formUpload,
    effectLevelSlider: effectLevelSlider,
    imgUploadPreview: imgUploadPreview,
    uploadPhoto: uploadPhoto,
    effectsLabels: effectsLabels,
    effectLevelValue: effectLevelValue,
    FILTER_DEFAULT: FILTER_DEFAULT
  };

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
  // если фокус в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== window.hashtags.textHashtagsInput) {
      imgUploadOverlay.classList.add('hidden');
    }
  });

  // Отправить форму при нажатии на enter
  uploadSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      imgUploadOverlay.submit();
    }
  });


  // функция сброса всех значений
  var defaultSettings = function () {
    imgUploadPreview.classList.add('scale-' + window.zoom.defoltSize);
    resetEffect();
    window.scaleIndicatorDefault();
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

    var sliderPinRadius = window.slider.sliderPin.offsetWidth / 2;
    var sliderPinPosition = window.slider.sliderPin.offsetLeft - sliderPinRadius;
    var sliderLineWidth = window.slider.sliderLine.offsetWidth;

    // находим коэффициент изменения интенсивности
    var rateIntensityFilter = getProportion(sliderPinPosition, sliderLineWidth);

    switch (true) {
      case uploadPhoto.classList.contains('effects__preview--chrome'):
        effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.chrome;
        uploadPhoto.style.filter = 'grayscale(' + effectLevelValue.value + ')';
        break;
      case uploadPhoto.classList.contains('effects__preview--sepia'):
        effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.sepia;
        uploadPhoto.style.filter = 'sepia(' + effectLevelValue.value + ')';
        break;
      case uploadPhoto.classList.contains('effects__preview--marvin'):
        effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.marvin;
        uploadPhoto.style.filter = 'invert(' + effectLevelValue.value + '%)';
        break;
      case uploadPhoto.classList.contains('effects__preview--phobos'):
        effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.phobos;
        uploadPhoto.style.filter = 'blur(' + effectLevelValue.value + 'px)';
        break;
      case uploadPhoto.classList.contains('effects__preview--heat'):
        effectLevelValue.value = rateIntensityFilter * FILTER_DEFAULT.heat;
        uploadPhoto.style.filter = 'brightness(' + effectLevelValue.value + ')';
        break;

      default:
        uploadPhoto.style.filter = '';
    }
  };

  var resetIntensityFilters = function () {
    uploadPhoto.style.filter = '';
  };


  // функция добавления фильтров на фото
  var toggleFilter = function (arr) {
    for (var i = 0; i < arr.length; i++) {

      arr[i].addEventListener('click', function (evt) {
        resetEffect();
        resetIntensityFilters();
        window.getDefaultSlider();
        sliderHidden(evt);

        // добавление класса фильтра
        imgUploadPreview.classList.add(getClassName(evt));
        getDefaultFilterMax();

        // меняем интенсивность фильтра
        window.slider.sliderPin.addEventListener('mouseup', function () {
          changeIntensityFilters();
        });
      });
    }
  };

  toggleFilter(effectsLabels);

})();
