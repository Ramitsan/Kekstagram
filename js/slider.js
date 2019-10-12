'use strict';

(function() {

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
  var getProportion = function(paramOne, paramTwo) {
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

})();
