'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var picturesElement = document.querySelector('.pictures');
  var btnCancelElement = document.querySelector('.big-picture__cancel');

  var socialCaption = document.querySelector('.social__caption');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');

  var currentPicture = {};


  picturesElement.addEventListener('click', function (e) {
    pictureClickHandler(e);
  });

  var pictureClickHandler = function (e) {
    document.body.classList.add('modal-open');
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
  };

  var modalCloseHanler = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    window.comments.loaderBtnElement.classList.remove('hidden');
    window.comments.showedCommentsNumber = window.comments.ShowedComment.START;
    document.removeEventListener('click', picturesElement);
  };


  var setBigPictureInfo = function (picture) {
    bigPictureImg.setAttribute('src', picture.url);
    socialCaption.textContent = picture.description;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = '' + picture.comments.length;

    window.comments.appendSocialComments(picture.comments);
    bigPicture.classList.remove('hidden');
  };

  window.picture = {
    picturesElement: picturesElement
  };

})();
