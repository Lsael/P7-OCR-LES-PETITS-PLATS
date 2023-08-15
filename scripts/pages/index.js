import { displaySearch } from '../algorithms/search.js';

const initHome = () => {
  displaySearch();
  document.querySelector('#searchInput').addEventListener('input', displaySearch);
};

initHome();
