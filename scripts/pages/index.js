import { filterRecipes } from '../algorithm/search.js';
import { recipes } from '../../database/recipes.js';
import { useThumbnailTemplate } from '../templates/templates.js';
import { getSearchInput, displayRecipesCount } from '../utils/utils.js';
import { displaySortingOptions, pickOption, displayOptionsMenu } from '../algorithm/options.js';
import { getSearchFromURL, updateTitleInURL } from '../algorithm/url.js';

export const getFilteredRecipes = () => {
  const { title, options } = getSearchFromURL()

  return filterRecipes(recipes, title, options);
};

const displaySearchResults = (recipes) => {
  const searchElement = document.querySelector('.search-result');
  searchElement.innerHTML = '';

  recipes.forEach((recipe) => {
    searchElement.innerHTML += useThumbnailTemplate(recipe);
  });
};

const setListeners = () => {
  document.querySelector('#searchInput').addEventListener('input', displaySearch);
  document.querySelectorAll('.options-title').forEach((element, index) => element.addEventListener('click', () => displayOptionsMenu(element, index)));
  document.querySelectorAll('.option').forEach((element) => element.addEventListener('click', () => pickOption(element)));
};

const displaySearch = () => {
  const input = getSearchInput()
  updateTitleInURL(input)
  const recipes = getFilteredRecipes();

  displaySortingOptions(recipes);
  displayRecipesCount(recipes.length);
  displaySearchResults(recipes);
  setListeners();
};

const initHome = () => {
  displaySearch();
};

initHome();
