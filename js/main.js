'use strict';

var DESCRIPTION_PHOTOS = ['Снято на Кэнон', 'Снято на Никон', 'Снято на телефон'];
var COMMENTS_PHOTOS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_AUTORS_PHOTOS = ['Артем', 'Кекс', 'Профи', 'Рудольф', 'Кира А.', 'Михаил В.', 'Анна', 'Alexandro778853', 'Тамара61', 'Elvis'];
var PHOTOS_AMOUNT = 24;
var AVATAR_AMOUNT = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;


// генерация случайного числа в заданном интервале, включительно
var getRandomIndex = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// генерируем случайный текст случайного коммента
var getRandomMessage = function (arr) {
  var randomMessage = getRandomIndex(0, arr.length);
  return arr[randomMessage];
};

// генерируем случайное имя
var getRandomName = function (arr) {
  var randomName = getRandomIndex(0, arr.length);
  return arr[randomName];
};

// генерируем случайное описание фото
var getRandomDescription = function (arr) {
  var randomDescription = getRandomIndex(0, arr.length);
  return arr[randomDescription];
};


// функция генерации одного комментария
var createPhotoComment = function(_avatar, _message, _name) {
  var comment = {
    avatar: _avatar,
    message: _message,
    name: _name
  }
  return comment;
};

//функция генерации массива комментариев
var createPhotoComments = function(length) {
  var comments = [];
  for (var i = 0; i <= length; i++) {
    var numberAvatar = 'img/avatar-' + getRandomIndex(1, AVATAR_AMOUNT) + '.svg';
    var message = getRandomMessage(COMMENTS_PHOTOS);
    var name = getRandomName(NAMES_AUTORS_PHOTOS);

    comments[i] = createPhotoComment(numberAvatar, message, name);
  }
  return comments;
};

var arrComments = createPhotoComments(PHOTOS_AMOUNT);
console.log(arrComments);


// функция генерации случайного комментария из массива комментариев
var getRandomComment = function (arr) {
  var randomComment = getRandomIndex(0, arr.length);
  return arr[randomComment];
};


// функция создания одного объекта с фото
var createPhotoObject = function(_url, _description, _likes, _comments) {
  var photo = {
    url: _url,
    description: _description,
    likes: _likes,
    comment: _comments
  }
  return photo;
};


// функция создания массива объектов
var createPhotoObjects = function(length) {
  var photos = [];
  for (var i = 0; i <= length; i++) {
    var photoUrl = 'photos/' + getRandomIndex(1, PHOTOS_AMOUNT) + '.jpg';
    var description = getRandomDescription(DESCRIPTION_PHOTOS);
    var likes = getRandomIndex(MIN_LIKES, MAX_LIKES);
    var comment = getRandomComment(arrComments);

    photos[i] = createPhotoObject(photoUrl, description, likes, comment);
  }
  return photos;
};


var fff = createPhotoObjects(PHOTOS_AMOUNT);
console.log(fff);
