import { displaySearch, displaySortOptions } from '../algorithms/search.js';

const initHome = () => {
  displaySortOptions();
  displaySearch();
  document.querySelector('#searchInput').addEventListener('input', displaySearch);
  document.querySelector('.ingredients-options').addEventListener('change', displaySearch);
  document.querySelector('.appliances-options').addEventListener('change', displaySearch);
  document.querySelector('.ustensils-options').addEventListener('change', displaySearch);
};

initHome();
