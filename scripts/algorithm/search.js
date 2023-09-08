import { search } from "./quickSearch.js";
/* import { search } from "./linearSearch.js"; */

const filterWithInput = (recipes, searchTerm) => {
  const filteredList = recipes.filter((recipe) => {
    const { name, description } = recipe;
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient).join(' ');
    const stringToTest = name + ' ' + description + ' ' + ingredients;

    return stringToTest.toUpperCase().match(searchTerm.toUpperCase());
  });

  return filteredList;
};

const filterWithOptions = (recipes, pickedOptions) => {
  let filteredList = recipes;

  const isValid = (recipe, category) => {
    let isValid = false
    switch(category) {
      case 'ingredients': 
        const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient)
        return isValid = search(ingredients, pickedOptions.ingredients)
/*       recipe.ingredients.forEach((ingredient) => {
          if(ingredient.ingredient === pickedOptions.ingredients) {
            return isValid = true;
          }}) */

      case 'appliances': 
        return isValid = recipe.appliance === pickedOptions.appliances

      case 'ustensils':
        return isValid = search(recipe.ustensils, pickedOptions.ustensils)
        /* recipe.ustensils.forEach((ustensil) => {
          if(ustensil === pickedOptions.ustensils) {
            return isValid = true;
          }
        }) */
    }
    return isValid
  }

  if(pickedOptions.ingredients) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'ingredients'))
  }

  if(pickedOptions.appliances) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'appliances'))
  }

  if(pickedOptions.ustensils) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'ustensils'))
  }

  return filteredList;
};

export const filterRecipes = (recipes, title, options) => {
  const recipesList = title ? filterWithInput(recipes, title) : recipes;
  const filteredList = filterWithOptions(recipesList, options);

  return filteredList;
};