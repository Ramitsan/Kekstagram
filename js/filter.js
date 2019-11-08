'use strict';

(function () {
  var RANDOM_PHOTO_NUMBER = 10;
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularBtnElement = imgFiltersElement.querySelector('#filter-popular');
  var filterRandomBtnElement = imgFiltersElement.querySelector('#filter-random');
  var filterDiscussedBtnElement = imgFiltersElement.querySelector('#filter-discussed');

  var activeFilterId = filterPopularBtnElement.getAttribute('id');
  var switchFilter = function (btnElement) {
    if (btnElement.getAttribute('id') !== activeFilterId) {
      btnElement.classList.add('img-filters__button--active');
      imgFiltersElement.querySelector('#' + activeFilterId)
        .classList.remove('img-filters__button--active');
      activeFilterId = btnElement.getAttribute('id');
    }
  };
  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = array[j];
      array[j] = array[i];
      array[i] = swap;
    }
    return array;
  };

  filterPopularBtnElement.addEventListener('click', function () {
    switchFilter(filterPopularBtnElement);
    updatePicture();
  });
  filterRandomBtnElement.addEventListener('click', function () {
    switchFilter(filterRandomBtnElement);
    updatePicture();
    // window.debounce(sortByRandom); // не работает
  });
  filterDiscussedBtnElement.addEventListener('click', function () {
    switchFilter(filterDiscussedBtnElement);
    updatePicture();
  });

  var sortByRandom = function (photos) {
    return shuffle(photos).slice(-RANDOM_PHOTO_NUMBER);
  };

  var sortByDiscussed = function (photos) {
    photos.sort(function (left, right) {
      var rankDiff = right.comments.length - left.comments.length;
      if (rankDiff === 0) {
        rankDiff = right.likes - left.likes;
      }
      return rankDiff;
    });
  };

  var updatePicture = function () {
    var filtredPicture = window.data.photos.slice();
    switch (activeFilterId) {
      case (filterRandomBtnElement.getAttribute('id')):
        filtredPicture = sortByRandom(filtredPicture);
        break;
      case (filterDiscussedBtnElement.getAttribute('id')):
        sortByDiscussed(filtredPicture);
        break;
    }
    window.gallery.render(filtredPicture);
  };

  window.filter = {
    show: function () {
      imgFiltersElement.classList.remove('img-filters--inactive');
    },
  };
})();
