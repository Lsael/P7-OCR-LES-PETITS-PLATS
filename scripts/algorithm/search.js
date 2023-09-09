import { search } from "./quickSearch.js";
/* import { search } from "./linearSearch.js"; */

const filterWithInput = (recipes, searchTerm) => {
  const filteredList = recipes.filter((recipe) => {
    const { name, description } = recipe;
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient).join(' ');

    if(name.toUpperCase().match(searchTerm.toUpperCase())) {
      return true
    } else if(description.toUpperCase().match(searchTerm.toUpperCase())) {
      return true
    } else if(ingredients.toUpperCase().match(searchTerm.toUpperCase())) {
      return true
    }
  });

  return filteredList;
};

// bug : quand on selectionne plusieurs element de la même liste, seul le premier est pris en compte
// TODO : Afficher les elements séléctionnés sous le select
// TODO : Trier les résultats par ordre alphabetique
const filterWithOptions = (recipes, pickedOptions) => {
  let filteredList = recipes;

  const isValid = (recipe, category) => {
    let isValid = false
    switch(category) {
      case 'ingredients': 
        const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient)
        return isValid = search(ingredients, pickedOptions.ingredients)

      case 'appliances': 
        return isValid = recipe.appliance === pickedOptions.appliances

      case 'ustensils':
        return isValid = search(recipe.ustensils, pickedOptions.ustensils)

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

export const filterRecipes = (recipes, searchTerm, options) => {
  let filteredList = recipes

  if(searchTerm) {
    filteredList = filterWithInput(filteredList, searchTerm)
  }

  if(options) {
    filteredList = filterWithOptions(filteredList, options)
  }

  return filteredList;
};