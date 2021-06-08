'use strict';

(() => {

  const ShowedComment = {
    START: 0,
    STEP: 5,
  };
  let showedCommentsNumber = ShowedComment.START;
  let commentCollection;

  const socialComments = document.querySelector('.social__comments');
  const commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  const loaderBtnElement = document.querySelector('.comments-loader');
  const footerTextInputElement = document.querySelector('.social__footer-text');

  const renderSocialComments = (data) => {
    let element = socialComments.querySelector('.social__comment').cloneNode(true);
    element.querySelector('.social__picture').src = data.avatar;
    element.querySelector('.social__picture').alt = data.name;
    element.querySelector('.social__text').textContent = data.message;
    element.style.display = 'none';
    return element;
  };

  const showCommentsInCollection = (collection) => {
    let nextShowedComment = showedCommentsNumber + ShowedComment.STEP;
    if (collection.length > nextShowedComment) {
      for (let i = showedCommentsNumber; i < nextShowedComment; i++) {
        collection[i].style.display = 'flex';
      }
      showedCommentsNumber = nextShowedComment;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (let j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = 'flex';
      }
      showedCommentsNumber = collection.length;
      commentsShowElement.textContent = collection.length;
      loaderBtnElement.classList.add('hidden');
      footerTextInputElement.focus();
    }
  };

  const appendSocialComments = (dataArray) => {
    let fragment = document.createDocumentFragment();
    dataArray.forEach((it) => {
      fragment.appendChild(renderSocialComments(it));
    });
    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);
    commentCollection = socialComments.querySelectorAll('.social__comment');
    showCommentsInCollection(commentCollection);
  };

  loaderBtnElement.addEventListener('click', () => {
    showCommentsInCollection(commentCollection);
  });

  window.comments = {
    ShowedComment: ShowedComment,
    showedCommentsNumber: showedCommentsNumber,
    appendSocialComments: appendSocialComments,
    loaderBtnElement: loaderBtnElement,

    reset: () => {
      showedCommentsNumber = ShowedComment.START;
    }
  };
})();