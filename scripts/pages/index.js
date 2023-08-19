import { displaySearch } from '../algorithms/search.js';

const initHome = () => {
  displaySearch();
  document.querySelector('#searchInput').addEventListener('input', displaySearch);
  document.querySelector('.appliances-options').addEventListener('change', displaySearch);
};

initHome();
