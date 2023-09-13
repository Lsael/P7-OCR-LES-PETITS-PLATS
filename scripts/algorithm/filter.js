import { search } from "./search/quickSearch.js";
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

/*     if(search(name.split(' '), searchTerm)) {
      return true
    } else if(search(description.split(' '), searchTerm)) {
      return true
    } else if(search(ingredients.split(' '), searchTerm)) {
      return true
    }
  }); */

  return filteredList;
};

const filterWithOptions = (recipes, options) => {
  let filteredList = recipes;

  const isValid = (recipe, category, option) => {
    let isValid = false
    switch(category) {
      case 'ingredients': 
        const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient)
        return isValid = search(ingredients, option)

      case 'appliances': 
        return isValid = recipe.appliance === option

      case 'ustensils':
        return isValid = search(recipe.ustensils, option)

    }
    return isValid
  }

  if(options.ingredients) {
    for(let i=0; i < options.ingredients.length; i++) {
      filteredList = filteredList.filter((recipe) => isValid(recipe, 'ingredients', options.ingredients[i]))
    }
  }

  if(options.appliances) {
    for(let i=0; i < options.appliances.length; i++) {
      filteredList = filteredList.filter((recipe) => isValid(recipe, 'appliances', options.appliances[i]))
    }
  }

  if(options.ustensils) {
    for(let i=0; i < options.ustensils.length; i++) {
      filteredList = filteredList.filter((recipe) => isValid(recipe, 'ustensils', options.ustensils[i]))
    }
  }

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