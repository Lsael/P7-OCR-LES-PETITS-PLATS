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
      return isValid = quickSearch(ingredients, pickedOptions.ingredients)
/*       recipe.ingredients.forEach((ingredient) => {
          if(ingredient.ingredient === pickedOptions.ingredients) {
            return isValid = true;
          }}) */

      case 'appliances': 
      if(recipe.appliance === pickedOptions.appliances) {isValid = true}
      break;

      case 'ustensils':
        recipe.ustensils.forEach((ustensil) => {
          if(ustensil === pickedOptions.ustensils) {
            return isValid = true;
          }
        })
      break;
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



const linearSearch = (list, searchTerm) => {
  let result = false;
  let count = 0
  for(let element of list) {
    if(element == searchTerm) {
      result = true
      break;
    }
    count += 1
  }
  return `result = ${result}, tried ${count} times`
}

const quickSearch = (list, searchTerm) => {
  let result = false;
  let pivot = parseInt((list.length) / 2)
  let count = 0
  list.sort()

  for(let i=0; i < list.length; i++) {
    if(list[pivot].toUpperCase() == searchTerm.toUpperCase()) {
      return result = true
    } else if(list[pivot] < searchTerm) {
      pivot = parseInt((pivot + list.length) /2)
    } else if(list[pivot] > searchTerm) {
      pivot = parseInt(pivot / 2)
    }
    count += 1
  }
  console.log(list[pivot], pivot, result);
/*   console.log(list[pivot], searchTerm, result); */
  return result
}

const test = ["a","c","b","v","e","z","j","r","t"]

/* console.log(linearSearch(test, "t"))
console.log(quickSearch(test, "t")) */