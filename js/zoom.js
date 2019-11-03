'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;
  var SCALE_START = 100;

  var currentScale = SCALE_START;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  var setImgScale = function (scale) {
    previewImgElement.style.transform = 'scale(' + (scale / SCALE_MAX) + ')';
    scaleControlValue.setAttribute('value', scale + '%');
    currentScale = scale;
  };

  scaleControlSmaller.addEventListener('click', function () {
    var nextScale = currentScale - SCALE_MIN;
    if (nextScale >= SCALE_MIN) {
      setImgScale(nextScale);
    }
  });
  scaleControlBigger.addEventListener('click', function () {
    var nextScale = currentScale + SCALE_STEP;
    if (nextScale <= SCALE_MAX) {
      setImgScale(nextScale);
    }
  });

  scaleControlValue.setAttribute('value', currentScale + '%');

  window.scaleIndicatorDefault = function () {
    setImgScale(SCALE_START);
  };
})();
