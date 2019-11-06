'use strict';

(function () {


  // var bigPictureLikes = bigPicture.querySelector('.likes-count');
  // var maxBigPicture = 4;
  // var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  // var socialComments = bigPicture.querySelector('.social__comments');
  // var countCommentsAll = 125; // общее количество комментов
  // var countCommentsShow = 3; // количество комментариев, показанных под фото
  // var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  // var commentsLoader = bigPicture.querySelector('.comments-loader');

  // Показ случайного большого фото
  // var generateBigImg = function () {
  //   var index = window.getRandomIndex(1, maxBigPicture);
  //   bigPictureImg.querySelector('img').src = 'img/logo-background-' + index + '.jpg';
  // };

  // генерируем и подставляем лайки
  // var getRandomLikes = function () {
  //   bigPictureLikes.textContent = window.getRandomIndex(window.data.MIN_LIKES, window.data.MAX_LIKES);
  // };
  //
  // // Количество комментариев всего
  // var setCommentsCount = function (count) {
  //   bigPictureCommentsCount.textContent = count;
  // };
  //
  // // случайное описание фото
  // var setBigPictureDesc = function () {
  //   var desc = window.data.DESCRIPTION_PHOTOS[window.getRandomIndex(0, window.data.DESCRIPTION_PHOTOS.length)];
  //   bigPicture.querySelector('.social__caption').textContent = desc;
  // };
  //
  // // генерируем комментарий
  // var generateComment = function (arrComment) {
  //   var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);
  //   socialComment.querySelector('.social__picture').src = arrComment.avatar;
  //   socialComment.querySelector('.social__picture').alt = arrComment.name;
  //   socialComment.querySelector('.social__text').textContent = arrComment.message;
  //   return socialComment;
  // };
  //
  // var generateComments = function (comments) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < countCommentsShow; i++) {
  //     var index = window.getRandomIndex(0, window.data.COMMENTS_PHOTOS.length);
  //     fragment.appendChild(generateComment(comments[index]));
  //   }
  //   socialComments.innerHTML = '';
  //   return socialComments.appendChild(fragment);
  // };

  // Финальная отрисовка большого фото с коммментариями
  // var bigPictureShow = function () {
  //   // generateBigImg();
  //   getRandomLikes();
  //   setCommentsCount(countCommentsAll);
  //   setBigPictureDesc();
  //   generateComments(window.arrComments);
  // };
  //
  // bigPictureShow();

  // прячем блоки счетчика комментариев и загрузки новых комментариев
  // socialCommentCount.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var picturesElement = document.querySelector('.pictures');
  var btnCancelElement = document.querySelector('.big-picture__cancel');

  var socialCaption = document.querySelector('.social__caption');
  var likesCount = document.querySelector('.likes-count');
  var socialComments = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');
  var currentPicture = {};

  picturesElement.addEventListener('click', function (e) {
    if (e.target.parentNode.classList.contains('picture')) {
      var currentImgSrc = e.target.getAttribute('src');

      currentPicture = window.data.photos.find(function (it) {
        if (it.url === currentImgSrc) {
          return it;
        }
      });

      setBigPictureInfo(currentPicture);

      btnCancelElement.addEventListener('click', function (e) {
        modalCloseHanler(e);
      });

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
          modalCloseHanler(e);
        }
      });

    }
  });

  var modalCloseHanler = function (e) {
    bigPicture.classList.add('hidden');
    document.removeEventListener('click', picturesElement);
  };

  var setBigPictureInfo = function (picture) {
    bigPictureImg.setAttribute('src', picture.url);
    socialCaption.textContent = picture.description;
    likesCount.textContent = picture.likes;

    var comment = socialComment.cloneNode(true);
    // socialComments.innerHTML = '';
    picture.comments.forEach(function (it) {
      comment.querySelector('.social__picture').setAttribute('src', it.avatar);
      comment.querySelector('.social__picture').setAttribute('alt', it.author);
      comment.querySelector('.social__text').setAttribute('src', it.message);
      socialComments.appendChild(comment);
    });

    bigPicture.classList.remove('hidden');
  };

  window.picture = {
    picturesElement: picturesElement
  };

})();
