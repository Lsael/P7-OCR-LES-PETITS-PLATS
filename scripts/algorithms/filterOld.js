import { search } from "../search.js";

const filterWithInput = (recipes, searchTerm) => {
  let filteredList = []
  
  for(const recipe of recipes) {
    const name = recipe.name
    const description = recipe.description
    
    // creating a string of ingredients to match with the searchTerm
    let ingredients = ''
    for(const ingredient of recipe.ingredients) {
      ingredients += ' ' + ingredient.ingredient
    }

    if(name.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe)
      continue;
    } else if(description.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe)
      continue;
    } else if(ingredients.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe)
      continue;
    }
  }

  return filteredList;
};

const filterWithOptions = (recipes, options) => {
  let filteredList = [];

   const isValid = (recipe, category, option) => {
    let isValid = false

    if(category === "ingredients") {
      let ingredients = []
      for(const element of recipe.ingredients) {
        ingredients.push(element.ingredient)
      }
      return isValid = search(ingredients, option)

    } else if(category === "appliances") {
        return isValid = recipe.appliance === option

    } else if(category === "ustensils") {
        return isValid = search(recipe.ustensils, option)
    }
    return isValid
  }

  if(options.ingredients || options.appliances || options.ustensils) {
    if(options.ingredients) {
      for(let i=0; i < recipes.length; i++) {
        for(let j=0; j < options.ingredients.length; j++) {
          if(isValid(recipes[i], "ingredients", options.ingredients[j])) {
            filteredList.push(recipes[i])
          }
        }
      }
    }
  
    if(options.appliances) {
      for(let i=0; i < recipes.length; i++) {
        for(let j=0; j < options.appliances.length; j++) {
          if(isValid(recipes[i], "appliances", options.appliances[j])) {
            filteredList.push(recipes[i])
          }
        }
      }
    }

    if(options.ustensils) {
      for(let i=0; i < recipes.length; i++) {
        for(let j=0; j < options.ustensils.length; j++) {
          if(isValid(recipes[i], "ustensils", options.ustensils[j])) {
            filteredList.push(recipes[i])
          }
        }
      }
    }
  } else filteredList = recipes

  return filteredList;
};

const compareName = (a, b) => {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
     return 1;
  return 0;
}

export const filterRecipes = (recipes, searchTerm, options) => {
  let filteredList = recipes

  if(searchTerm) {
    filteredList = filterWithInput(filteredList, searchTerm)
  }

  if(options) {
    filteredList = filterWithOptions(filteredList, options)
  }

  filteredList.sort(compareName)

  return filteredList;
};