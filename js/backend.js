'use strict';

(function () {
  var URL_SAVE = 'https://javascript.pages.academy/kekstagram';
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var REQUEST_TIMEOUT = 3000; // 3s
  var REQUEST_STATUS_OK = 200;
  var REQUEST_STATUS_BAD = 400;
  var REQUEST_STATUS_NOT_FOUND = 404;
  var REQUEST_STATUS_SERVER_ERROR = 500;


  var serverRequest = function (URL, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.open(method, URL);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case REQUEST_STATUS_OK:
          onLoad(xhr.response);
          break;
        case REQUEST_STATUS_BAD:
          onError('Неправильный запрос.  Код ошибки ' + xhr.status);
          break;
        case REQUEST_STATUS_NOT_FOUND:
          onError('Страница не найдена. Код ошибки ' + xhr.status);
          break;
        case REQUEST_STATUS_SERVER_ERROR:
          onError('Внутренняя ошибка сервера. Код ошибки ' + xhr.status);
          break;
        default:
          onError('При загрузке произошла ошибка ' + xhr.status + '. Повторите попытку позже.');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send(data);
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      serverRequest(URL_SAVE, 'POST', data, onLoad, onError);
    },

    load: function (onLoad, onError) {
      serverRequest(URL_LOAD, 'GET', null, onLoad, onError);
    }
  };

})();
