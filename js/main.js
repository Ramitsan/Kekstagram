'use strict';
// константы
var DESCRIPTION_PHOTOS = ['Снято на Кэнон', 'Снято на Никон', 'Снято на Хассель', 'Снято на Роллейфлекс', 'Снято на Зенит', 'Снято на Айфон', 'Снято на Полароид'];
var COMMENTS_PHOTOS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Какое чудное боке!',
  'Сначала научитесь камеру в руках держать!',
  'Отличный ракурс!',
  'Шибко нрра!',
  'Обработка могла быть и лучше!'
];
var NAMES_AUTORS_PHOTOS = ['Артем', 'Кекс', 'Профи', 'Рудольф', 'Кира А.', 'Михаил В.', 'Анна', 'Alexandro778853', 'Тамара61', 'Elvis'];
var PHOTOS_AMOUNT = 25;
var AVATAR_AMOUNT = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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


// генерация случайного числа в заданном интервале, включительно
var getRandomIndex = function (min, max) {
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
    var numberAvatar = 'img/avatar-' + getRandomIndex(1, AVATAR_AMOUNT) + '.svg';
    var message = getRandomMessage(COMMENTS_PHOTOS);
    var name = getRandomName(NAMES_AUTORS_PHOTOS);

    comments[i] = createPhotoComment(numberAvatar, message, name);
  }
  return comments;
};

var arrComments = createPhotoComments(PHOTOS_AMOUNT);

// функция генерации случайного комментария из массива комментариев
var getRandomComment = function (arr) {
  var randomComment = getRandomIndex(0, arr.length);
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
    var description = getRandomDescription(DESCRIPTION_PHOTOS);
    var likes = getRandomIndex(MIN_LIKES, MAX_LIKES);
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
var completedPhotoList = createPhotoObjects(PHOTOS_AMOUNT);

// Отрисовка сгенерированных DOM-элементов
pictureList.appendChild(renderPictureList(completedPhotoList));

// Дополнительное задание
// Показываем большое фото
// bigPicture.classList.remove('hidden');

// Показ случайного большого фото
var generateBigImg = function () {
  var index = getRandomIndex(1, maxBigPicture);
  bigPictureImg.querySelector('img').src = 'img/logo-background-' + index + '.jpg';
};

// генерируем и подставляем лайки
var getRandomLikes = function () {
  bigPictureLikes.textContent = getRandomIndex(MIN_LIKES, MAX_LIKES);
};

// Количество комментариев всего
var setCommentsCount = function (count) {
  bigPictureCommentsCount.textContent = count;
};

// случайное описание фото
var setBigPictureDesc = function () {
  var desc = DESCRIPTION_PHOTOS[getRandomIndex(0, DESCRIPTION_PHOTOS.length)];
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
    var index = getRandomIndex(0, COMMENTS_PHOTOS.length);
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

// прячем блоки счетчика комментариеа и загрузки новых комментариев
socialCommentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');

// 4. Обработка событий
// Личный проект: подробности

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
var uploadCancel = document.querySelector('#upload-cancel');
var uploadSubmit = document.querySelector('#upload-submit');
// var formUpload = document.querySelector('.img-upload__form');
var effectLevelSlider = document.querySelector('.effect-level');


// открытие и закрытие окна редактирования фото
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  effectLevelSlider.classList.add('hidden');
});

uploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== textHashtagsInput) {
    imgUploadOverlay.classList.add('hidden');
  }
});

// Отправить форму при нажатии на enter
uploadSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    imgUploadOverlay.submit();
  }
});

// масштабирование
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value'); // инпут
var imgUploadPreview = document.querySelector('.img-upload__preview'); // предварительный просмотр изображения
var stepResize = 25;
var minSize = 25;
var maxSize = 100;
var defoltSize = 100;
var scaleControlValueNumber = defoltSize; // значение масштаба в текущий момент

// показатель масштаба при открытии фотографии
var scaleIndicatorDefault = function () {
  scaleControlValue.value = defoltSize + '%';
};
scaleIndicatorDefault();


// уменьшение масштаба изображения
var controlSmallerHandler = function () {
  if (scaleControlValueNumber <= maxSize && scaleControlValueNumber > minSize) {
    scaleControlValueNumber -= stepResize;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// увеличение масштаба изображения
var controlBiggerHandler = function () {
  if (scaleControlValueNumber >= minSize && scaleControlValueNumber < maxSize) {
    scaleControlValueNumber += stepResize;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// показ измененного масштаба изображения
var resize = function () {
  imgUploadPreview.classList.remove('scale-25', 'scale-50', 'scale-75', 'scale-100');
  imgUploadPreview.classList.add('scale-' + scaleControlValueNumber);
};

var photoSmaller = function () {
  controlSmallerHandler();
  resize();
};

var photoBigger = function () {
  controlBiggerHandler();
  resize();
};

scaleControlSmaller.addEventListener('click', photoSmaller);
scaleControlBigger.addEventListener('click', photoBigger);

// применение фильтров
var uploadPhoto = document.querySelector('.img-upload__preview img');
var effectsLabels = document.querySelectorAll('.effects__label');

var FILTER_DEFAULT = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3
};


// добавляем класс для фото соответственно выбранному фильтру
var getClassName = function (evt) {
  var filterName = evt.target.parentNode.htmlFor;

  if (filterName === 'effect-none') {
    uploadPhoto.classList.add('effects__preview--none');
  }
  if (filterName === 'effect-chrome') {
    uploadPhoto.classList.add('effects__preview--chrome');
  }
  if (filterName === 'effect-sepia') {
    uploadPhoto.classList.add('effects__preview--sepia');
  }
  if (filterName === 'effect-marvin') {
    uploadPhoto.classList.add('effects__preview--marvin');
  }
  if (filterName === 'effect-phobos') {
    uploadPhoto.classList.add('effects__preview--phobos');
  }
  if (filterName === 'effect-heat') {
    uploadPhoto.classList.add('effects__preview--heat');
  }
};


// функция скрытия слайдера, если выбран эффект «Оригинал»
var sliderHidden = function (evt) {
  var filterName = evt.target.parentNode.htmlFor;
  if (filterName === 'effect-none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }
};

// Функция удаления добавленных классов
var resetEffect = function () {
  uploadPhoto.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
};


// перемещение ползунка слайдера
var effectLevelValue = document.querySelector('.effect-level__value');
var sliderPin = document.querySelector('.effect-level__pin');
var sliderLine = document.querySelector('.effect-level__line');
var sliderEffectDepth = document.querySelector('.effect-level__depth');
var EFFECT_MAX_VALUE = 100;

// var filterSaturationLevelDefault = 100;
// var sliderWidth = 495;
// var sliderPadding = 20;


// установка значения слайдера по дефолту
var getDefaultSlider = function () {
  sliderPin.style.left = EFFECT_MAX_VALUE + '%';
  sliderEffectDepth.style.width = EFFECT_MAX_VALUE + '%';
  effectLevelValue.value = EFFECT_MAX_VALUE;
};


// максимальные значения фильтров по дефолту
var getDefaultFilterMax = function () {
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = 'grayscale(' + FILTER_DEFAULT.chrome + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = 'sepia(' + FILTER_DEFAULT.sepia + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = 'marvin(' + FILTER_DEFAULT.marvin + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = 'phobos(' + FILTER_DEFAULT.phobos + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = 'brightness(' + FILTER_DEFAULT.heat + ')';
  }
};

// пропорция
var getProportion = function (paramOne, paramTwo) {
  return (paramOne / paramTwo).toFixed(1);
};


// функция установки интенсивности фильтров
var changeIntensityFilters = function () {

  var sliderPinRadius = sliderPin.offsetWidth / 2;
  var sliderPinPosition = sliderPin.offsetLeft - sliderPinRadius;
  var sliderLineWidth = sliderLine.offsetWidth;

  // находим коэффициент изменения интенсивности
  var coefficientFilter = getProportion(sliderPinPosition, sliderLineWidth);

  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    effectLevelValue.value = coefficientFilter * FILTER_DEFAULT.chrome;
    imgUploadPreview.style.filter = 'grayscale(' + effectLevelValue.value + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    effectLevelValue.value = coefficientFilter * FILTER_DEFAULT.sepia;
    imgUploadPreview.style.filter = 'sepia(' + effectLevelValue.value + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    effectLevelValue.value = coefficientFilter * FILTER_DEFAULT.marvin;
    imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    effectLevelValue.value = coefficientFilter * FILTER_DEFAULT.phobos;
    imgUploadPreview.style.filter = 'blur(' + effectLevelValue.value + 'px)';
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    effectLevelValue.value = coefficientFilter * FILTER_DEFAULT.heat;
    imgUploadPreview.style.filter = 'brightness(' + effectLevelValue.value + ')';
  }
};


// функция добавления фильтров на фото
var toggleFilter = function (arr) {
  for (var i = 0; i < arr.length; i++) {

    arr[i].addEventListener('click', function (evt) {
      resetEffect();
      getDefaultSlider();
      sliderHidden(evt);

      // добавление класса фильтра
      imgUploadPreview.classList.add(getClassName(evt));
      getDefaultFilterMax();

      // меняем интенсивность фильтра
      sliderPin.addEventListener('mouseup', function () {
        changeIntensityFilters();
      });

    });
  }
};

toggleFilter(effectsLabels);


// валидация хэш-тегов
var textHashtagsInput = document.querySelector('.text__hashtags');
var MAX_HASHTEGS = 5;
var MAX_HASHTEGS_LENGTH = 20;

// функция проверки хэштегов
var hashtagsValidation = function (target, value) {
  var arrHashtags = value.split(' ', MAX_HASHTEGS);

  for (var i = 0; i < arrHashtags.length; i++) {
    var hashtag = arrHashtags[i];

    switch (true) {
      case hashtag[0] !== '#':
        target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
        break;
      case hashtag === '#' && hashtag.length === 1:
        target.setCustomValidity('Хештег не может состоять только из одной решётки');
        break;
      case arrHashtags.length > MAX_HASHTEGS:
        target.setCustomValidity('Количество хэштегов не должно превышать ' + MAX_HASHTEGS);
        break;
      case hashtag.length > MAX_HASHTEGS_LENGTH:
        target.setCustomValidity('Хэштег не должен превышать ' + MAX_HASHTEGS_LENGTH + ' символов');
        break;
      default:
        target.setCustomValidity('');
    }
  }
};

textHashtagsInput.addEventListener('input', function (evt) {
  var hashtagValue = textHashtagsInput.value.toLowerCase();
  var target = evt.target;

  hashtagsValidation(target, hashtagValue);
});
