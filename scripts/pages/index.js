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

const getFilteredRecipes = () => {
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
  const getOptions = (category) => {
    let options = [];
    switch(category) {
      case 'ingredients': recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => options.push(ingredient.ingredient));
      })
      case 'appliances': recipes.forEach((recipe) => {
        options.push(recipe.appliance);
      })
      case 'ustensils': recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => options.push(ustensil));
      })
    }

    const filteredOptions = [...new Set(options)];
    return filteredOptions;
  };

  return {
    ingredients: getOptions('ingredients'),
    appliances: getOptions('appliances'),
    ustensils:getOptions('ustensils')
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

const displaySuggestions = () => {
  const recipes = getFilteredRecipes()
  const suggestionsElement = document.querySelector(".suggestions")
  suggestionsElement.innerHTML = ''

  recipes.forEach((recipe) => {
    console.log(recipe)
    document.querySelector(".suggestions").innerHTML += `<li>${recipe.name}</li>`
  })
}

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
  const recipes = getFilteredRecipes();

  displayRecipesCount(recipes.length)
  displaySearchResults(recipes);
};

const initHome = () => {
  displaySortOptions();
  displaySearch();
  document.querySelector('#searchInput').addEventListener('input', displaySuggestions);
  document.querySelector('.ingredients-options').addEventListener('change', displaySearch);
  document.querySelector('.appliances-options').addEventListener('change', displaySearch);
  document.querySelector('.ustensils-options').addEventListener('change', displaySearch);
};

initHome();
