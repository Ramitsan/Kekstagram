'use strict';

(function () {

  var ShowedComment = {
    START: 0,
    STEP: 5,
  };
  var showedCommentsNumber = ShowedComment.START;
  var commentCollection;

  var socialComments = document.querySelector('.social__comments');
  var commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  var loaderBtnElement = document.querySelector('.comments-loader');
  var footerTextInputElement = document.querySelector('.social__footer-text');

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
  };

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

  loaderBtnElement.addEventListener('click', function () {
    showCommentsInCollection(commentCollection);
  });

  window.comments = {
    ShowedComment: ShowedComment,
    showedCommentsNumber: showedCommentsNumber,
    appendSocialComments: appendSocialComments,
    loaderBtnElement: loaderBtnElement,

    reset: function () {
      showedCommentsNumber = ShowedComment.START;
    }
  };
})();
