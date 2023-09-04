const filterWithInput = (recipes, title) => {
  const sortedList = recipes.filter((recipe) => {
    const { name, description } = recipe;
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient).join(' ');
    const stringToTest = name + ' ' + description + ' ' + ingredients;

    return stringToTest.toUpperCase().match(title.toUpperCase());
  });

  return sortedList;
};

const filterWithOptions = (recipes, pickedOptions) => {
  let filteredList = recipes;

  const isValid = (recipe, category) => {
    let isValid = false
    switch(category) {
      case 'ingredients': 
      recipe.ingredients.forEach((ingredient) => {
          if(ingredient.ingredient === pickedOptions.ingredients) {
            return isValid = true;
          }})
      break;

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