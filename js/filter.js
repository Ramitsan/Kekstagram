'use strict';

(() => {
  const RANDOM_PHOTO_NUMBER = 10;
  const imgFiltersElement = document.querySelector('.img-filters');
  const filterPopularBtnElement = imgFiltersElement.querySelector('#filter-popular');
  const filterRandomBtnElement = imgFiltersElement.querySelector('#filter-random');
  const filterDiscussedBtnElement = imgFiltersElement.querySelector('#filter-discussed');

  let activeFilterId = filterPopularBtnElement.getAttribute('id');
  const switchFilter = (btnElement) => {
    if (btnElement.getAttribute('id') !== activeFilterId) {
      btnElement.classList.add('img-filters__button--active');
      imgFiltersElement.querySelector('#' + activeFilterId)
        .classList.remove('img-filters__button--active');
      activeFilterId = btnElement.getAttribute('id');
    }
  };
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let swap = array[j];
      array[j] = array[i];
      array[i] = swap;
    }
    return array;
  };

  filterPopularBtnElement.addEventListener('click', () => {
    switchFilter(filterPopularBtnElement);
    window.debounce(updatePicture);
  });
  filterRandomBtnElement.addEventListener('click', () => {
    switchFilter(filterRandomBtnElement);
    window.debounce(updatePicture);
  });
  filterDiscussedBtnElement.addEventListener('click', () => {
    switchFilter(filterDiscussedBtnElement);
    window.debounce(updatePicture);
  });

  const sortByRandom = (photos) => {
    return shuffle(photos).slice(-RANDOM_PHOTO_NUMBER);
  };

  const sortByDiscussed = (photos) => {
    photos.sort((left, right) => {
      let rankDiff = right.comments.length - left.comments.length;
      if (rankDiff === 0) {
        rankDiff = right.likes - left.likes;
      }
      return rankDiff;
    });
  };

  const updatePicture = () => {
    let filtredPicture = window.data.photos.slice();
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
    show: () => {
      imgFiltersElement.classList.remove('img-filters--inactive');
    }
  };
})();