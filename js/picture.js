'use strict';

(function () {

// Показываем большое фото
// bigPicture.classList.remove('hidden');

// Показ случайного большого фото
var generateBigImg = function () {
  var index = window.getRandomIndex(1,  window.data.maxBigPicture);
  bigPictureImg.querySelector('img').src = 'img/logo-background-' + index + '.jpg';
};

// генерируем и подставляем лайки
var getRandomLikes = function () {
  bigPictureLikes.textContent = window.getRandomIndex(window.data.MIN_LIKES, window.data.MAX_LIKES);
};

// Количество комментариев всего
var setCommentsCount = function (count) {
  bigPictureCommentsCount.textContent = count;
};

// случайное описание фото
var setBigPictureDesc = function () {
  var desc = window.data.DESCRIPTION_PHOTOS[window.getRandomIndex(0, window.data.DESCRIPTION_PHOTOS.length)];
  bigPicture.querySelector('.social__caption').textContent = desc;
};

// генерируем комментарий
var generateComment = function (arrComment) {
  var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);
  socialComment.querySelector('.social__picture').src = arrComment.avatar;
  socialComment.querySelector('.social__picture').alt = arrComment.name;
  socialComment.querySelector('.social__text').textContent = arrComment.message;
  return socialComment;
};

var generateComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < countCommentsShow; i++) {
    var index = window.getRandomIndex(0, window.data.COMMENTS_PHOTOS.length);
    fragment.appendChild(generateComment(comments[index]));
  }
  socialComments.innerHTML = '';
  return socialComments.appendChild(fragment);
};

// Финальная отрисовка большого фото с коммментариями
var bigPictureShow = function () {
  generateBigImg();
  getRandomLikes();
  setCommentsCount(countCommentsAll);
  setBigPictureDesc();
  generateComments(arrComments);
};

bigPictureShow();

// прячем блоки счетчика комментариев и загрузки новых комментариев
socialCommentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');

})();
