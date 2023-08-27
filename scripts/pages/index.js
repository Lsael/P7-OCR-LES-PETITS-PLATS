import { filterRecipes } from '../algorithm/search.js';
import { recipes } from '../../database/recipes.js';
import { useThumbnailTemplate } from '../templates/templates.js';
import { getPickedOptions, getSearchInput, displayRecipesCount, displayOptionsMenu } from '../utils/utils.js';
import { displaySortOptions } from '../algorithm/options.js';

export const getFilteredRecipes = () => {
  const input = getSearchInput();
  const options = getPickedOptions();

  const filteredRecipes = filterRecipes(recipes, input, options);

  // function to test with 500 recipes
  /*   let sortedRecipes = sortRecipes(recipes, input, options);
  sortedRecipes = [].concat(...Array(10).fill(sortedRecipes)) */

  return filteredRecipes;
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
};

const displaySearch = () => {
  const recipes = getFilteredRecipes();

  displaySortOptions(recipes);
  displayRecipesCount(recipes.length);
  displaySearchResults(recipes);
  setListeners();
};

const initHome = () => {
  displaySearch();
};

initHome();
