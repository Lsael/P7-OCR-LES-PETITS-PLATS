/* import { filterRecipes } from '../algorithms/filterNew.js'; */
import { filterRecipes } from '../algorithms/filterOld.js';
import { recipes } from '../../database/recipes.js';
import { useThumbnailTemplate } from '../templates/templates.js';
import { getSearchInput, displayRecipesCount } from '../utils/utils.js';
import { displayPickedOptions, displaySortingOptions } from '../options.js';
import { getSearchFromURL, updateTitleInURL } from '../url.js';
import { handleClickPickOption, handleMainSearchInput, handleMenuOpenClose, handleOptionSearchInput } from '../utils/listeners.js';

// TODO : Afficher "Aucune recette" quand aucun résultat
// BUG : Boucle infini quand on cherche dans la barre APRES avoir choisi des options

export const getFilteredRecipes = () => {
  const { title, options } = getSearchFromURL();

  return filterRecipes(recipes, title, options);
};

const displaySearchResults = (recipes) => {
  const searchElement = document.querySelector('.search-result');
  searchElement.innerHTML = '';

  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      searchElement.innerHTML += useThumbnailTemplate(recipe);
    });
  } else {
    searchElement.innerHTML = "<div class='no-recipe'><span>Aucun résultat ne correspond à votre recherche.</span></div>";
  }
};

const setListeners = () => {
  handleMainSearchInput();
  handleMenuOpenClose();
  handleOptionSearchInput();
  handleClickPickOption();
};

export const displaySearch = () => {
  const input = getSearchInput();
  updateTitleInURL(input);

  const recipes = getFilteredRecipes();

  displaySortingOptions();
  displayRecipesCount(recipes.length);
  displaySearchResults(recipes);
  setListeners();
};

const initHome = () => {
  displaySearch();
  displayPickedOptions();
};

initHome();
