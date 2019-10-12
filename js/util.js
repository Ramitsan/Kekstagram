'use strict';

// КОНСТАНТЫ
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  // генерация случайного числа в заданном интервале, включительно
  var getRandomIndex = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

})();
