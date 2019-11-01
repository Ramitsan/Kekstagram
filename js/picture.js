'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var maxBigPicture = 4;
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var countCommentsAll = 125; // общее количество комментов
  var countCommentsShow = 3; // количество комментариев, показанных под фото
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  // var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  window.picture = {
    bigPicture: bigPicture,
    bigPictureImg: bigPictureImg,
    bigPictureLikes: bigPictureLikes,
    maxBigPicture: maxBigPicture,
    bigPictureCommentsCount: bigPictureCommentsCount,
    socialComments: socialComments,
    countCommentsAll: countCommentsAll,
    countCommentsShow: countCommentsShow,
    socialCommentCount: socialCommentCount,
    commentsLoader: commentsLoader
  };

  // // Показываем большое фото
  // window.openBigPicture = function () {
  //   document.querySelector('body').classList.add('modal-open');
  //   bigPicture.classList.remove('hidden');
  // };

  // window.openBigPicture();




  // // закрываем большое фото
  // bigPictureCancel.addEventListener('click', function () {
  //   bigPicture.classList.add('hidden');
  // };

  // Показ случайного большого фото
  var generateBigImg = function () {
    var index = window.getRandomIndex(1, maxBigPicture);
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
    generateComments(window.arrComments);
  };

  bigPictureShow();


  // // прячем блоки счетчика комментариев и загрузки новых комментариев
  // socialCommentCount.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');

})();
