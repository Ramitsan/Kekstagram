'use strict';

(function () {

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
