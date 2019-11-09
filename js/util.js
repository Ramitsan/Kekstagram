'use strict';

// КОНСТАНТЫ
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    pressEsc: function (evt) {
      return evt.keyCode === window.util.ESC_KEYCODE;
    },

    pressEnter: function (evt) {
      return evt.keyCode === window.util.ENTER_KEYCODE;
    }
  };

})();
