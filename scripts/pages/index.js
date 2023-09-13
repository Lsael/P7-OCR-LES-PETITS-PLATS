import { filterRecipes } from '../algorithm/filter.js';
import { recipes } from '../../database/recipes.js';
import { useThumbnailTemplate } from '../templates/templates.js';
import { getSearchInput, displayRecipesCount } from '../utils/utils.js';
import { displayPickedOptions, displaySortingOptions } from '../algorithm/options.js';
import { getSearchFromURL, updateTitleInURL } from '../algorithm/url.js';
import { handleClickPickOption, handleMainSearchInput, handleMenuOpenClose, handleOptionSearchInput } from '../utils/listeners.js';

// TODO : Fermer le menu des options quand on clique à l'exterieur

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
  handleMainSearchInput()
  handleMenuOpenClose()
  handleOptionSearchInput()
  handleClickPickOption()
};

export const displaySearch = () => {
  const input = getSearchInput()
  updateTitleInURL(input)
  
  const recipes = getFilteredRecipes();

  displaySortingOptions();
  displayRecipesCount(recipes.length);
  displaySearchResults(recipes);
  setListeners();
};

const initHome = () => {
  displaySearch();
  displayPickedOptions()
};

initHome();
