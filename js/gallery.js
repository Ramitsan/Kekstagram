'use strict';

(function () {

  // переменные
  var templatePicture = document.querySelector('#picture');
  var templatePictureItem = templatePicture.content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');


  window.gallery = {
    templatePicture: templatePicture,
    templatePictureItem: templatePictureItem,
    pictureList: pictureList
  };


  // генерируем случайный текст случайного коммента
  var getRandomMessage = function (arr) {
    var randomMessage = window.getRandomIndex(0, arr.length);
    return arr[randomMessage];
  };

  // генерируем случайное имя
  var getRandomName = function (arr) {
    var randomName = window.getRandomIndex(0, arr.length);
    return arr[randomName];
  };

  // // генерируем случайное описание фото
  // var getRandomDescription = function (arr) {
  //   var randomDescription = window.getRandomIndex(0, arr.length);
  //   return arr[randomDescription];
  // };

  // функция генерации одного комментария
  var createPhotoComment = function (_avatar, _message, _name) {
    var comment = {
      avatar: _avatar,
      message: _message,
      name: _name
    };
    return comment;
  };


  // функция генерации массива комментариев
  var createPhotoComments = function (length) {
    var comments = [];
    for (var i = 0; i < length; i++) {
      var numberAvatar = 'img/avatar-' + window.getRandomIndex(1, window.data.AVATAR_AMOUNT) + '.svg';
      var message = getRandomMessage(window.data.COMMENTS_PHOTOS);
      var name = getRandomName(window.data.NAMES_AUTORS_PHOTOS);

      comments[i] = createPhotoComment(numberAvatar, message, name);
    }
    return comments;
  };

  window.arrComments = createPhotoComments(window.data.PHOTOS_AMOUNT);

  // // функция генерации случайного комментария из массива комментариев
  // var getRandomComment = function (arr) {
  //   var randomComment = window.getRandomIndex(0, arr.length);
  //   return arr[randomComment];
  // };


  // // функция создания одного объекта с фото
  // var createPhotoObject = function (_url, _description, _likes, _comments) {
  //   var photo = {
  //     url: _url,
  //     description: _description,
  //     likes: _likes,
  //     comment: _comments
  //   };
  //   return photo;
  // };

  // функция создания массива объектов с фото
  // var createPhotoObjects = function (length) {
  //   var photos = [];
  //   for (var i = 0; i < length; i++) {
  //     var photoUrl = 'photos/' + (i + 1) + '.jpg';
  //     var description = getRandomDescription(window.data.DESCRIPTION_PHOTOS);
  //     var likes = window.getRandomIndex(window.data.MIN_LIKES, window.data.MAX_LIKES);
  //     var comment = getRandomComment(window.arrComments);

  //     photos[i] = createPhotoObject(photoUrl, description, likes, comment);
  //   }
  //   return photos;
  // };

  // Рендер DOM-элемента на основе объекта
  var renderPicture = function (pictureItem) {
    var pictureElement = templatePictureItem.cloneNode(true);
    var pictureElementImg = pictureElement.querySelector('.picture__img');

    pictureElementImg.src = pictureItem.url;
    pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments;

    return pictureElement;
  };

  // // Заполнение DOM-элемента на основе массива
  // var renderPictureList = function (arrPhotos) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < arrPhotos.length; i++) {
  //     fragment.appendChild(renderPicture(arrPhotos[i]));
  //   }
  //   return fragment;
  // };

  // Получаем массив с фотографиями и коментариями
  // var completedPhotoList = createPhotoObjects(window.data.PHOTOS_AMOUNT);

  // // Отрисовка сгенерированных DOM-элементов
  // pictureList.appendChild(renderPictureList(completedPhotoList));


  // обработчик успешной загрузки
  var successHandler = function (arrPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      fragment.appendChild(renderPicture(arrPhotos[i]));
    }

    pictureList.appendChild(fragment);
  };


  // обработчик ошибки
  var errorHandler = function () {

    var error = document.querySelector('#error').content.querySelector('.error');
    document.querySelector('main').append(error);
    return error;
  };

  window.load(successHandler, errorHandler);

})();
