'use strict';

// КОНСТАНТЫ
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // генерация случайного числа в заданном интервале, включительно
  window.getRandomIndex = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.pressEsc = function (evt) {
    return evt.keyCode === window.util.ESC_KEYCODE;
  };

  window.pressEnter = function (evt) {
    return evt.keyCode === window.util.ENTER_KEYCODE;
  };


  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

})();
