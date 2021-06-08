'use strict';

(() => {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    pressEsc: (evt) => {
      return evt.keyCode === window.util.ESC_KEYCODE;
    },

    pressEnter: (evt) => {
      return evt.keyCode === window.util.ENTER_KEYCODE;
    }
  };

})();