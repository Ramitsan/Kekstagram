'use strict';

(function () {

  // масштабирование
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value'); // инпут

  var stepResize = 25;
  var minSize = 25;
  var maxSize = 100;
  var defoltSize = 100;
  var scaleControlValueNumber = defoltSize; // значение масштаба в текущий момент

  window.zoom = {
    scaleControlSmaller: scaleControlSmaller,
    scaleControlBigger: scaleControlBigger,
    scaleControlValue: scaleControlValue,
    stepResize: stepResize,
    minSize: minSize,
    maxSize: maxSize,
    defoltSize: defoltSize
  };

  // масштаб по дефолту
  window.scaleDefault = function () {
    scaleControlValue.value = defoltSize + '%';
    window.filters.imgUploadPreview.style.transform = 'scale(1)';
  };

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
    window.filters.imgUploadPreview.style.transform = 'scale(' + (scaleControlValueNumber / 100) + ')';
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

})();
