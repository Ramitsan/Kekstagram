'use strict';

(() => {

  const COEFFICIENT_MAX = 1;
  const Percent = {
    MIN: 0,
    MAX: 100,
  };
  const PhobosCoefficient = {
    MIN: 0,
    MAX: 3,
  };
  const HeatCoefficient = {
    MIN: 1,
    MAX: 3,
  };
  const NONE_EFFECT = 'none';
  const convertProportion = (coefficient, from, to) => {
    return (to - from) * coefficient + from;
  };
  const effectMap = {
    'none': () => {
      return '';
    },
    'chrome': (coefficient) => {
      return 'grayscale(' + coefficient + ')';
    },
    'sepia': (coefficient) => {
      return 'sepia(' + coefficient + ')';
    },
    'marvin': (coefficient) => {
      return 'invert(' + (coefficient * Percent.MAX) + '%)';
    },
    'phobos': (coefficient) => {
      return 'blur(' + convertProportion(coefficient, PhobosCoefficient.MIN, PhobosCoefficient.MAX) + 'px)';
    },
    'heat': (coefficient) => {
      return 'brightness(' + convertProportion(coefficient, HeatCoefficient.MIN, HeatCoefficient.MAX);
    },
  };
  const imgElement = document.querySelector('.img-upload__preview');
  const lineElement = document.querySelector('.effect-level__line');
  const pinElement = lineElement.querySelector('.effect-level__pin');
  const depthElement = lineElement.querySelector('.effect-level__depth');
  const rangeElement = document.querySelector('.effect-level__value');

  const getMaxValuePinAndDepth = () => {
    let percentMax = Percent.MAX + '%';
    pinElement.style.left = percentMax;
    depthElement.style.width = percentMax;
  };

  let checkedElementValue = '';
  lineElement.addEventListener('mousedown', (downEvt) => {
    let coefficient = lineElement.getBoundingClientRect().width / rangeElement.max;
    const getPinPosition = (evt) => {
      rangeElement.value = (evt.clientX - lineElement.getBoundingClientRect().left) / coefficient;
      let effectLevel = rangeElement.value * coefficient + 'px';
      pinElement.style.left = effectLevel;
      depthElement.style.width = effectLevel;
      imgElement.style.filter = effectMap[checkedElementValue](rangeElement.value / Percent.MAX);
    };
    getPinPosition(downEvt);

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      getPinPosition(moveEvt);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  const fieldsetElement = document.querySelector('.effect-level');

  const getOrigin = () => {
    imgElement.style.filter = '';
    fieldsetElement.style.display = 'none';
    rangeElement.value = Percent.MIN;
  };

  const getEffect = (evt) => {
    imgElement.style.filter = effectMap[evt.target.value](COEFFICIENT_MAX);
    getMaxValuePinAndDepth();
    rangeElement.value = Percent.MAX;
    fieldsetElement.style.display = 'block';
  };
  const addOnEffectsRadioChange = (element) => {
    element.addEventListener('change', (evt) => {
      checkedElementValue = evt.target.value;
      if (evt.target.value === NONE_EFFECT) {
        getOrigin();
      } else {
        getEffect(evt);
      }
    });
  };

  const radioCollection = document.querySelectorAll('.effects__list .effects__item .effects__radio');
  radioCollection.forEach((it) => {
    addOnEffectsRadioChange(it);
  });

  getOrigin();

  window.getOriginSlider = getOrigin;

})();