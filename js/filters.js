'use strict';

(function () {

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

  var FILTERS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  window.filters = {
    effectLevelSlider: effectLevelSlider,
    imgUploadPreview: imgUploadPreview,
    uploadPhoto: uploadPhoto,
    effectsLabels: effectsLabels,
    effectLevelValue: effectLevelValue,
    FILTER_DEFAULT: FILTER_DEFAULT,
    FILTERS: FILTERS
  };


  // функция сброса всех значений
  window.defaultSettings = function () {
    imgUploadPreview.classList.add('scale-' + window.zoom.defoltSize);
    resetEffect(FILTERS);
    window.scaleIndicatorDefault();
    window.hashtags.textHashtagsInput.value = '';
    window.form.commentInput.value = '';
  };


  // добавляем класс для фото соответственно выбранному фильтру
  var getClassName = function (evt) {
    var filterName = evt.target.parentElement.htmlFor;

    switch (filterName) {
      case 'effect-none':
        uploadPhoto.classList.add('effects__preview--none');
        break;
      case 'effect-chrome':
        uploadPhoto.classList.add('effects__preview--chrome');
        break;
      case 'effect-sepia':
        uploadPhoto.classList.add('effects__preview--sepia');
        break;
      case 'effect-marvin':
        uploadPhoto.classList.add('effects__preview--marvin');
        break;
      case 'effect-phobos':
        uploadPhoto.classList.add('effects__preview--phobos');
        break;
      case 'effect-heat':
        uploadPhoto.classList.add('effects__preview--heat');
        break;
    }
    return uploadPhoto.className;
  };


  // функция скрытия слайдера, если выбран эффект «Оригинал»
  var sliderHidden = function (evt) {
    var filterName = evt.target.parentElement.htmlFor;
    if (filterName === 'effect-none') {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }
  };

  // функция сброса фильтров, примененных ранее
  var resetEffect = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      uploadPhoto.classList.remove('effects__preview--' + arr[i]);
    }
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
  window.changeIntensityFilters = function () {

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
        resetEffect(FILTERS);
        resetIntensityFilters();
        window.getDefaultSlider();
        sliderHidden(evt);

        // добавление класса фильтра
        uploadPhoto.classList.add(getClassName(evt));
        getDefaultFilterMax();
      });
    }
  };

  toggleFilter(effectsLabels);
})();
