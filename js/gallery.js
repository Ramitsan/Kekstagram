'use strict';

(function () {

  // переменные
  var templatePicture = document.querySelector('#picture');
  var templatePictureItem = templatePicture.content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');


  // Рендер DOM-элемента на основе объекта
  var renderPicture = function (pictureItem) {
    var pictureElement = templatePictureItem.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pictureItem.url;
    pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

    return pictureElement;
  };

  var successLoadHandler = function (arrPhotos) {
    window.data.photos = arrPhotos;
    window.data.photos.forEach(function (it) {
      picturesElement.appendChild(renderPicture(it));
    });
    window.filter.show();
  };

  var errorLoadHandler = function (errorMessage) {
    var error = document.querySelector('#error').content.querySelector('.error');
    error.querySelector('.error__title').textContent = errorMessage;
    error.querySelector('.error__title').style.lineHeight = '50px';
    document.querySelector('main').append(error);
    return error;
  };

  var removeCollection = function (collection) {
    collection.forEach(function (it) {
      it.remove();
    });
  };

  var appendPhotosFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
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
