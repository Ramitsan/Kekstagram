'use strict';

(() => {
  const SCALE_MAX = 100;
  const SCALE_MIN = 25;
  const SCALE_STEP = 25;
  const SCALE_START = 100;

  let currentScale = SCALE_START;
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const previewImgElement = document.querySelector('.img-upload__preview img');

  const setImgScale = (scale) => {
    previewImgElement.style.transform = `scale(${scale / SCALE_MAX})`;
    scaleControlValue.setAttribute('value', `${scale}%`);
    currentScale = scale;
  };

  scaleControlSmaller.addEventListener('click', () => {
    let nextScale = currentScale - SCALE_MIN;
    if (nextScale >= SCALE_MIN) {
      setImgScale(nextScale);
    }
  });
  scaleControlBigger.addEventListener('click', () => {
    let nextScale = currentScale + SCALE_STEP;
    if (nextScale <= SCALE_MAX) {
      setImgScale(nextScale);
    }
  });

  scaleControlValue.setAttribute('value', `${currentScale}%`);

  window.scaleIndicatorDefault = () => {
    setImgScale(SCALE_START);
  };
})();
