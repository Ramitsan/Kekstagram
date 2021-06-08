'use strict';

(() => {

  const templatePicture = document.querySelector('#picture');
  const templatePictureItem = templatePicture.content.querySelector('.picture');
  const picturesElement = document.querySelector('.pictures');


  // Рендер DOM-элемента на основе объекта
  const renderPicture = (pictureItem) => {
    let pictureElement = templatePictureItem.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pictureItem.url;
    pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

    return pictureElement;
  };

  const successLoadHandler = (arrPhotos) => {
    window.data.photos = arrPhotos;
    window.data.photos.forEach((it) => {
      picturesElement.appendChild(renderPicture(it));
    });
    window.filter.show();
  };

  const errorLoadHandler = (errorMessage) => {
    let error = document.querySelector('#error').content.querySelector('.error');
    error.querySelector('.error__title').textContent = errorMessage;
    error.querySelector('.error__title').style.lineHeight = '50px';
    document.querySelector('main').append(error);
    return error;
  };

  const removeCollection = (collection) => {
    collection.forEach((it) => {
      it.remove();
    });
  };

  const appendPhotosFragment = (dataArray) => {
    let fragment = document.createDocumentFragment();
    dataArray.forEach((it) => {
      fragment.appendChild(renderPicture(it));
    });
    removeCollection(picturesElement.querySelectorAll('.picture'));
    window.picture.picturesElement.appendChild(fragment);
  };

  window.backend.load(successLoadHandler, errorLoadHandler);

  window.gallery = {
    render: appendPhotosFragment
  };

})();