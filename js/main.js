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
var PHOTOS_AMOUNT = 25;
var AVATAR_AMOUNT = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;


// генерация случайного числа в заданном интервале, включительно
var getRandomIndex = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// генерируем url фото
var photoUrl = 'photos/' + getRandomIndex(1, PHOTOS_AMOUNT) + '.jpg';
console.log(photoUrl);

// генерируем случайное количество лайков
var likes = getRandomIndex(MIN_LIKES, MAX_LIKES);
console.log(likes);

// генерируем url случайного аватара
var numberAvatar = 'img/avatar-' + getRandomIndex(1, AVATAR_AMOUNT) + '.svg';
console.log(numberAvatar);


// функция генерации одного комментария
var createPhotoComment = function(_avatar, _message, _name) {
  var comment = {
    avatar: numberAvatar,
    message: getRandomIndex(COMMENTS_PHOTOS),
    name: getRandomIndex(NAMES_AUTORS_PHOTOS)
  }
  return comment;
};

//функция генерации массива комментариев
var createPhotoComments = function(length) {
  var comments = [];
  for (var i = 0; i <= length; i++) {
    var indexComment = getRandomIndex(0, comments.length);
    comments.push(createPhotoComment(comments.length[indexComment], ));
  }
  return comments;
};


// функция создания одного объекта с фото
var createPhotoObject = function(_url, _description, _likes, _comments) {
  var photo = {
    url: photoUrl,
    description: getRandomIndex(DESCRIPTION_PHOTOS),
    likes: likes,
    comment: getRandomIndex(comments)
  }
  return photo;
};


// функция создания массива объектов
var createPhotoObjects = function(length) {
  var photos = [];

  for (var i = 0; i <= length; i++) {
    var indexPhoto = getRandomIndex(0, photos.length);
    photos.push(createPhotoObject(photos.length[indexPhoto], ));
  }
  return photos;
};
