'use strict';

(function () {

// переменные
var templatePicture = document.querySelector('#picture');
var templatePictureItem = templatePicture.content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img');
var bigPictureLikes = bigPicture.querySelector('.likes-count');
var maxBigPicture = 4;
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var socialComments = bigPicture.querySelector('.social__comments');
var countCommentsAll = 125; // общее количество комментов
var countCommentsShow = 3; // количество комментариев, показанных под фото
var socialCommentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');


// генерируем случайный текст случайного коммента
var getRandomMessage = function (arr) {
  var randomMessage = window.util.getRandomIndex(0, arr.length);
  return arr[randomMessage];
};

// генерируем случайное имя
var getRandomName = function (arr) {
  var randomName = window.util.getRandomIndex(0, arr.length);
  return arr[randomName];
};

// генерируем случайное описание фото
var getRandomDescription = function (arr) {
  var randomDescription = window.util.getRandomIndex(0, arr.length);
  return arr[randomDescription];
};

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
    var numberAvatar = 'img/avatar-' + window.util.getRandomIndex(1, window.data.AVATAR_AMOUNT) + '.svg';
    var message = getRandomMessage(window.data.COMMENTS_PHOTOS);
    var name = getRandomName(window.data.NAMES_AUTORS_PHOTOS);

    comments[i] = createPhotoComment(numberAvatar, message, name);
  }
  return comments;
};

var arrComments = createPhotoComments(window.data.PHOTOS_AMOUNT);

// функция генерации случайного комментария из массива комментариев
var getRandomComment = function (arr) {
  var randomComment = window.util.getRandomIndex(0, arr.length);
  return arr[randomComment];
};


// функция создания одного объекта с фото
var createPhotoObject = function (_url, _description, _likes, _comments) {
  var photo = {
    url: _url,
    description: _description,
    likes: _likes,
    comment: _comments
  };
  return photo;
};

// функция создания массива объектов с фото
var createPhotoObjects = function (length) {
  var photos = [];
  for (var i = 0; i < length; i++) {
    var photoUrl = 'photos/' + (i + 1) + '.jpg';
    var description = getRandomDescription(window.data.DESCRIPTION_PHOTOS);
    var likes = window.util.getRandomIndex(window.data.MIN_LIKES, window.data.MAX_LIKES);
    var comment = getRandomComment(arrComments);

    photos[i] = createPhotoObject(photoUrl, description, likes, comment);
  }
  return photos;
};

// Рендер DOM-элемента на основе объекта
var renderPicture = function (pictureItem) {
  var pictureElement = templatePictureItem.cloneNode(true);
  var pictureElementImg = pictureElement.querySelector('.picture__img');

  pictureElementImg.src = pictureItem.url;
  pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments;

  return pictureElement;
};

// Заполнение DOM-элемента на основе массива
var renderPictureList = function (arrPhotos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrPhotos.length; i++) {
    fragment.appendChild(renderPicture(arrPhotos[i]));
  }
  return fragment;
};

// Получаем массив с фотографиями и коментариями
var completedPhotoList = createPhotoObjects(window.data.PHOTOS_AMOUNT);

// Отрисовка сгенерированных DOM-элементов
pictureList.appendChild(renderPictureList(completedPhotoList));

// Показываем большое фото
// bigPicture.classList.remove('hidden');

// Показ случайного большого фото
var generateBigImg = function () {
  var index = window.util.getRandomIndex(1, maxBigPicture);
  bigPictureImg.querySelector('img').src = 'img/logo-background-' + index + '.jpg';
};

// генерируем и подставляем лайки
var getRandomLikes = function () {
  bigPictureLikes.textContent = window.util.getRandomIndex(window.data.MIN_LIKES, window.data.MAX_LIKES);
};

// Количество комментариев всего
var setCommentsCount = function (count) {
  bigPictureCommentsCount.textContent = count;
};

// случайное описание фото
var setBigPictureDesc = function () {
  var desc = window.data.DESCRIPTION_PHOTOS[window.util.getRandomIndex(0, window.data.DESCRIPTION_PHOTOS.length)];
  bigPicture.querySelector('.social__caption').textContent = desc;
};

// генерируем комментарий
var generateComment = function (arrComment) {
  var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);
  socialComment.querySelector('.social__picture').src = arrComment.avatar;
  socialComment.querySelector('.social__picture').alt = arrComment.name;
  socialComment.querySelector('.social__text').textContent = arrComment.message;
  return socialComment;
};

var generateComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < countCommentsShow; i++) {
    var index = window.util.getRandomIndex(0, window.data.COMMENTS_PHOTOS.length);
    fragment.appendChild(generateComment(comments[index]));
  }
  socialComments.innerHTML = '';
  return socialComments.appendChild(fragment);
};

// Финальная отрисовка большого фото с коммментариями
var bigPictureShow = function () {
  generateBigImg();
  getRandomLikes();
  setCommentsCount(countCommentsAll);
  setBigPictureDesc();
  generateComments(arrComments);
};

bigPictureShow();

// прячем блоки счетчика комментариев и загрузки новых комментариев
socialCommentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');

})();
