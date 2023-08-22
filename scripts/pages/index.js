import { sortRecipes } from '../algorithms/search.js';
import { recipes } from '../../database/recipes.js';
import { useOptionsTemplate } from '../templates/optionsTemplate.js'
import { useThumbnailTemplate } from '../templates/thumbnailTemplate.js'

const getSearchInput = () => {
  const searchInput = document.querySelector('#searchInput').value;

  return searchInput;
};

const getPickedOptions = () => {
  const ingredient = document.querySelector('.ingredients-options').value;
  const appliance = document.querySelector('.appliances-options').value;
  const ustensil = document.querySelector('.ustensils-options').value;

  return { ingredient, appliance, ustensil };
};

const getRecipes = () => {
  const input = getSearchInput();
  const options = getPickedOptions();

  const sortedRecipes = sortRecipes(recipes, input, options);

  // function to test with 500 recipes
/*   let sortedRecipes = sortRecipes(recipes, input, options);
  sortedRecipes = [].concat(...Array(10).fill(sortedRecipes)) */

  return sortedRecipes;
};

// need to factorize
const getSortOptions = () => {
  const getIngredientsOptions = () => {
    let options = [];
    recipes.map((recipe) => {
      recipe.ingredients.map((ingredient) => options.push(ingredient.ingredient));
    });
    const ingredientsOptions = [...new Set(options)];
    return ingredientsOptions;
  };

  const getApplianceOptions = () => {
    let options = [];
    recipes.map((recipe) => {
      options.push(recipe.appliance);
    });
    const applianceOptions = [...new Set(options)];
    return applianceOptions;
  };

  const getUstensilsOptions = () => {
    let options = [];
    recipes.map((recipe) => {
      recipe.ustensils.map((ustensil) => options.push(ustensil));
    });
    const ustensilsOptions = [...new Set(options)];
    return ustensilsOptions;
  };
  return {
    ingredients: getIngredientsOptions(),
    appliances: getApplianceOptions(),
    ustensils: getUstensilsOptions()
  };
};

const displaySortOptions = () => {
  const { ingredients, appliances, ustensils } = getSortOptions();
  const ingredientsOptionsElement = document.querySelector('.ingredients-options');
  const appliancesOptionsElement = document.querySelector('.appliances-options');
  const ustensilsOptionsElement = document.querySelector('.ustensils-options');

  ingredientsOptionsElement.innerHTML = useOptionsTemplate('Ingrédients', ingredients);
  appliancesOptionsElement.innerHTML = useOptionsTemplate('Appareils', appliances);
  ustensilsOptionsElement.innerHTML = useOptionsTemplate('Usentiles', ustensils);
};

const displaySearchResults = (recipes) => {
  const searchElement = document.querySelector('.search-result');
  searchElement.innerHTML = '';

  recipes.map((recipe) => {
    searchElement.innerHTML += useThumbnailTemplate(recipe);
  })
};

const displayRecipesCount = (count) => {
  const recipesCountElement = document.querySelector('#recipes-count');

  if(count === 0) {
    recipesCountElement.innerText = "0 recette"
  } else {
    recipesCountElement.innerText = count + " recettes"
  }
}

const displaySearch = () => {
  const recipes = getRecipes();

  displayRecipesCount(recipes.length)
  displaySearchResults(recipes);
};

const initHome = () => {
  displaySortOptions();
  displaySearch();
  document.querySelector('#searchInput').addEventListener('input', displaySearch);
  document.querySelector('.ingredients-options').addEventListener('change', displaySearch);
  document.querySelector('.appliances-options').addEventListener('change', displaySearch);
  document.querySelector('.ustensils-options').addEventListener('change', displaySearch);
};

initHome();
