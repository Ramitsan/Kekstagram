'use strict';

(() => {

  const MAX_HASHTEGS = 5;
  const MAX_HASHTEG_LENGTH = 20;
  const hashtagInputElement = document.querySelector('.text__hashtags');

  const validateHashtagInput = (value) => {
    let hashtags = value.split(' ');

    hashtagInputElement.setCustomValidity('');

    hashtags.forEach((it, i) => {
      if (it[0] !== '#') {
        hashtagInputElement.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      } else if (it === '#' && it.length === 1) {
        hashtagInputElement.setCustomValidity('Хештег не может состоять только из одной решётки');
      } else if (hashtags.length > MAX_HASHTEGS) {
        hashtagInputElement.setCustomValidity('Количество хэштегов не должно превышать ' + MAX_HASHTEGS);
      } else if (it.length > MAX_HASHTEG_LENGTH) {
        hashtagInputElement.setCustomValidity('Хэштег не должен превышать ' + MAX_HASHTEG_LENGTH + ' символов');
      } else if (it.split('#').length > 2) {
        hashtagInputElement.setCustomValidity('Хэштеги должны разделяться пробелами');
      } else if (hashtags.slice(i + 1).find((item) => {
          return item === it;
        })) {
        hashtagInputElement.setCustomValidity('Хэштеги не должны повторяться');
      }

    });
  };

  hashtagInputElement.addEventListener('change', (evt) => {
    validateHashtagInput(evt.target.value);
    if (hashtagInputElement.checkValidity()) {
      hashtagInputElement.style.outline = 'none';
      hashtagInputElement.style.borderColor = '#ffffff';
    }
  });

  hashtagInputElement.addEventListener('invalid', () => {
    hashtagInputElement.style.outline = 'none';
    hashtagInputElement.style.borderColor = '#ff0000';
  });

  window.hashtags = {
    hashtagInputElement: hashtagInputElement
  };

})();