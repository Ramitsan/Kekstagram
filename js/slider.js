'use strict';

(function () {

  // перемещение ползунка слайдера

  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderEffectDepth = document.querySelector('.effect-level__depth');
  var EFFECT_MAX_VALUE = 100;

  // var filterSaturationLevelDefault = 100;
  // var sliderWidth = 495;
  // var sliderPadding = 20;

  window.slider = {
    sliderPin: sliderPin,
    sliderLine: sliderLine,
    sliderEffectDepth: sliderEffectDepth,
    EFFECT_MAX_VALUE: EFFECT_MAX_VALUE
  };


  // установка значения слайдера по дефолту
  window.getDefaultSlider = function () {
    sliderPin.style.left = EFFECT_MAX_VALUE + '%';
    sliderEffectDepth.style.width = EFFECT_MAX_VALUE + '%';
    window.form.effectLevelValue.value = EFFECT_MAX_VALUE;
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

      if (sliderPin.offsetLeft - shift.x - sliderLine.style.left >= 0 && sliderPin.offsetLeft - shift.x <= sliderEffectDepth.offsetWidth) {
        sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';
      } else {
        window.form.formUpload.removeEventListener('mousemove', onMouseMove);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.formUpload.removeEventListener('mousemove', onMouseMove);
      // window.form.formUpload.removeEventListener('mouseup', onMouseUp);
    };

    window.form.formUpload.addEventListener('mousemove', onMouseMove);
    window.form.formUpload.addEventListener('mouseup', onMouseUp);
  });

})();
