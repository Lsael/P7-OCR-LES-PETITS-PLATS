import { recipes } from '../../database/recipes.js';
import { useThumbnailTemplate } from '../templates/thumbnailTemplate.js';
import { useOptionsTemplate } from '../templates/optionsTemplate.js';

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

const sortByInput = (searchInput) => {
  const sortedList = recipes.filter((recipe) => {
    const { name, description } = recipe;
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient).join(' ');
    const stringToTest = name + ' ' + description + ' ' + ingredients;

    return stringToTest.toUpperCase().match(searchInput.toUpperCase());
  });

  return sortedList;
};

const sortByOptions = (recipes, pickedOptions) => {
  const sortedList = pickedOptions.appliance.length !== 0 ? recipes.filter((recipe) => recipe.appliance === pickedOptions.appliance) : recipes;

  return sortedList;
};

const sortRecipes = (input, options) => {
  const filteredList = sortByInput(input);
  const sortedList = sortByOptions(filteredList, options);

  return sortedList;
};

const getRecipes = () => {
  const input = getSearchInput();
  const options = getPickedOptions();

  const sortedRecipes = sortRecipes(input, options);
  return sortedRecipes;
};

const getSortOptions = (recipes) => {
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

const displaySortOptions = (recipes) => {
  const { ingredients, appliances, ustensils } = getSortOptions(recipes);
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

  for (let i = 0; i < recipes.length; i++) {
    searchElement.innerHTML += useThumbnailTemplate(recipes[i]);
  }
};

export const displaySearch = () => {
  const recipes = getRecipes();

  displaySortOptions(recipes);
  displaySearchResults(recipes);
};
