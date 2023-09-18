import { search } from '../search.js';

const filterWithInput = (recipes, searchTerm) => {
  let filteredList = recipes;

  for (const recipe of recipes) {
    const name = recipe.name;
    const description = recipe.description;
    
    // creating a string of ingredients to match with the searchTerm
    let ingredients = '';
    for (const ingredient of recipe.ingredients) {
      ingredients += ' ' + ingredient.ingredient;
    }

    if (name.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe);
      continue;
    } else if (description.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe);
      continue;
    } else if (ingredients.toUpperCase().match(searchTerm.toUpperCase())) {
      filteredList.push(recipe);
      continue;
    }
  }

  return filteredList;
};

const filterWithOptions = (recipes, options) => {
  let filteredList = recipes;

  const isValid = (recipe, category, option) => {
    let isValid = false;

    if (category === 'ingredients') {
      let ingredients = [];
      for (const element of recipe.ingredients) {
        ingredients.push(element.ingredient);
      }
      return (isValid = search(ingredients, option));
    } else if (category === 'appliances') {
      return (isValid = recipe.appliance === option);
    } else if (category === 'ustensils') {
      return (isValid = search(recipe.ustensils, option));
    }
    return isValid;
  };

  if (options.ingredients || options.appliances || options.ustensils) {
    const filterByCategory = (category) => {
      if (options[category]) {
        let list = [];
        let ok = false;
        for (let i = 0; i < filteredList.length; i++) {
          for (let j = 0; j < options[category].length; j++) {
            if (isValid(filteredList[i], category, options[category][j])) {
              ok = true;
            } else {
              ok = false;
              break;
            }
          }
          if (ok === true) {
            list.push(filteredList[i]);
          }
        }
        filteredList = list;
      }
    };

    filterByCategory('ingredients');
    filterByCategory('appliances');
    filterByCategory('ustensils');
  }
  return filteredList;
};

const sortByName = (filteredList) => {
  for (let i = 0; i < filteredList.length; i++) {
    for (let j = 0; j < filteredList.length; j++) {
      if (filteredList[i].name.toUpperCase() < filteredList[j].name.toUpperCase()) {
        const element = filteredList.splice(i, 1);
        filteredList.splice(j, 0, element[0]);
      }
    }
  }
};

export const filterRecipes = (recipes, searchTerm, options) => {
  let filteredList = recipes;

  if (searchTerm) {
    filteredList = filterWithInput(filteredList, searchTerm);
  }

  if (options) {
    filteredList = filterWithOptions(filteredList, options);
  }

  sortByName(filteredList);

  return filteredList;
};
