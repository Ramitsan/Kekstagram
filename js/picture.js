'use strict';

(() => {

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const picturesElement = document.querySelector('.pictures');
  const btnCancelElement = document.querySelector('.big-picture__cancel');

  const socialCaption = document.querySelector('.social__caption');
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');

  let currentPicture = {};


  picturesElement.addEventListener('click', (e) => {
    pictureClickHandler(e);
  });

  const pictureClickHandler = (e) => {

    let picture = e.path.find((it) => {
      return (it.classList) ? it.classList.contains('picture') : false;
    });
    if (picture) {
      document.body.classList.add('modal-open');
      let currentImgSrc = picture.querySelector('.picture__img').getAttribute('src');

      currentPicture = window.data.photos.find((it) => {
        return it.url === currentImgSrc;
      });

      setBigPictureInfo(currentPicture);

      btnCancelElement.addEventListener('click', (evt) => {
        modalCloseHanler(evt);
      });

      document.addEventListener('keydown', (evt) => {
        if (window.util.pressEsc(evt)) {
          modalCloseHanler();
        }
      });
    }
  };

  const modalCloseHanler = () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    window.comments.loaderBtnElement.classList.remove('hidden');
    window.comments.reset();
    document.removeEventListener('click', picturesElement);
  };


  const setBigPictureInfo = (picture) => {
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