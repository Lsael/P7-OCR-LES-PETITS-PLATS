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
      case 'ingredient': 
      recipe.ingredients.forEach((ingredient) => {
          if(ingredient.ingredient === pickedOptions.ingredient) {
            return isValid = true;
          }})
      break;

      case 'appliance': 
      if(recipe.appliance === pickedOptions.appliance) {isValid = true}
      break;

      case 'ustensil':
        recipe.ustensils.forEach((ustensil) => {
          if(ustensil === pickedOptions.ustensil) {
            return isValid = true;
          }
        })
      break;
    }
    return isValid
  }

  if(pickedOptions.ingredient) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'ingredient'))
  }

  if(pickedOptions.appliance) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'appliance'))
  }

  if(pickedOptions.ustensil) {
    filteredList = filteredList.filter((recipe) => isValid(recipe, 'ustensil'))
  }

  return filteredList;
};

export const filterRecipes = (recipes, title, options) => {
  const recipesList = title ? filterWithInput(recipes, title) : recipes;
  const filteredList = filterWithOptions(recipesList, options);

  return filteredList;
};