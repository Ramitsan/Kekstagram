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

    var picture = e.path.find(function (it) {
      return (it.classList) ? it.classList.contains('picture') : false;
    });
    if (picture) {
      document.body.classList.add('modal-open');
      var currentImgSrc = picture.querySelector('.picture__img').getAttribute('src');

      currentPicture = window.data.photos.find(function (it) {
        return it.url === currentImgSrc;
      });

      setBigPictureInfo(currentPicture);

      btnCancelElement.addEventListener('click', function (evt) {
        modalCloseHanler(evt);
      });

      document.addEventListener('keydown', function (evt) {
        if (window.util.pressEsc(evt)) {
          modalCloseHanler();
        }
      });
    }
  };

  var modalCloseHanler = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    window.comments.loaderBtnElement.classList.remove('hidden');
    window.comments.reset();
    document.removeEventListener('click', picturesElement);
  };


  var setBigPictureInfo = function (picture) {
    bigPictureImg.setAttribute('src', picture.url);
    socialCaption.textContent = picture.description;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = '' + picture.comments.length;

    window.comments.appendSocialComments(picture.comments);
    bigPicture.classList.remove('hidden');
    likesCount.focus();
  };

  window.picture = {
    picturesElement: picturesElement
  };

})();
