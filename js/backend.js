'use strict';

(() => {
  const URL_SAVE = 'https://23.javascript.pages.academy/kekstagram';
  const URL_LOAD = 'https://ramitsan.github.io/Kekstagram/data.json';
  const REQUEST_TIMEOUT = 3000; // 3s
  const REQUEST_STATUS_OK = 200;
  const REQUEST_STATUS_BAD = 400;
  const REQUEST_STATUS_NOT_FOUND = 404;
  const REQUEST_STATUS_SERVER_ERROR = 500;


  const serverRequest = (URL, method, data, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.open(method, URL);

    xhr.addEventListener('load', () => {
      switch (xhr.status) {
        case REQUEST_STATUS_OK:
          onLoad(xhr.response);
          break;
        case REQUEST_STATUS_BAD:
          onError(`Неправильный запрос.  Код ошибки  ${xhr.status}`);
          break;
        case REQUEST_STATUS_NOT_FOUND:
          onError(`Страница не найдена. Код ошибки ${xhr.status}`);
          break;
        case REQUEST_STATUS_SERVER_ERROR:
          onError(`Внутренняя ошибка сервера. Код ошибки ${xhr.status}`);
          break;
        default:
          onError(`При загрузке произошла ошибка ${xhr.status}. Повторите попытку позже.`);
      }
    });

    xhr.addEventListener('error', () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.send(data);
  };

  window.backend = {
    save: (data, onLoad, onError) => {
      serverRequest(URL_SAVE, 'POST', data, onLoad, onError);
    },

    load: (onLoad, onError) => {
      serverRequest(URL_LOAD, 'GET', null, onLoad, onError);
    }
  };

})();
