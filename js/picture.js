'use strict';

(function () {

  var ShowedComment = {
    START: 0,
    STEP: 5,
  };
  var showedCommentsNumber = ShowedComment.START;
  var commentCollection;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var picturesElement = document.querySelector('.pictures');
  var btnCancelElement = document.querySelector('.big-picture__cancel');

  var socialCaption = document.querySelector('.social__caption');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialComments = document.querySelector('.social__comments');
  var currentPicture = {};

  var commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  var loaderBtnElement = document.querySelector('.comments-loader');
  var footerTextInputElement = document.querySelector('.social__footer-text');

  loaderBtnElement.addEventListener('click', function () {
    showCommentsInCollection(commentCollection);
  });

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
  loaderBtnElement.classList.remove('hidden');
  showedCommentsNumber = ShowedComment.START;
  document.removeEventListener('click', picturesElement);
};

  var renderSocialComments = function (data) {
    var element = socialComments.querySelector('.social__comment').cloneNode(true);
    element.querySelector('.social__picture').src = data.avatar;
    element.querySelector('.social__picture').alt = data.name;
    element.querySelector('.social__text').textContent = data.message;
    element.style.display = 'none';
    return element;
  };

  var showCommentsInCollection = function (collection) {
    var nextShowedComment = showedCommentsNumber + ShowedComment.STEP;
    if (collection.length > nextShowedComment) {
      for (var i = showedCommentsNumber; i < nextShowedComment; i++) {
        collection[i].style.display = 'flex';
      }
      showedCommentsNumber = nextShowedComment;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (var j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = 'flex';
      }
      showedCommentsNumber = collection.length;
      commentsShowElement.textContent = collection.length;
      loaderBtnElement.classList.add('hidden');
      footerTextInputElement.focus();
    }
  }

  var appendSocialComments = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderSocialComments(it));
    });
    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);
    commentCollection = socialComments.querySelectorAll('.social__comment');
    showCommentsInCollection(commentCollection);
  };

  var setBigPictureInfo = function (picture) {
    bigPictureImg.setAttribute('src', picture.url);
    socialCaption.textContent = picture.description;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = '' + picture.comments.length;

    // renderSocialComments(picture.comments)

    appendSocialComments(picture.comments)
    // picture.comments.forEach(function (it) {
    //   comment.querySelector('.social__picture').setAttribute('src', it.avatar);
    //   comment.querySelector('.social__picture').setAttribute('alt', it.author);
    //   comment.querySelector('.social__text').setAttribute('src', it.message);
    //   socialComments.appendChild(comment);
    // });


    bigPicture.classList.remove('hidden');
  };

  window.picture = {
    picturesElement: picturesElement
  };

})();
