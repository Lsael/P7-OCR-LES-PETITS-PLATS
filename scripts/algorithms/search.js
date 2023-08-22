const sortByInput = (recipes, searchInput) => {
  const sortedList = recipes.filter((recipe) => {
    const { name, description } = recipe;
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient).join(' ');
    const stringToTest = name + ' ' + description + ' ' + ingredients;

    return stringToTest.toUpperCase().match(searchInput.toUpperCase());
  });

  return sortedList;
};

const sortByOptions = (recipes, pickedOptions) => {
  let filteredList = recipes;

  const validIngredient = (recipe) => {
    let isValid = false
    recipe.ingredients.map((ingredient) => {
      if((ingredient.ingredient === pickedOptions.ingredient) || pickedOptions.ingredient === '') {
        return isValid = true;
      }})
    return isValid
  }

  const validAppliance = (recipe) => {
    let isValid = false
    if((recipe.appliance === pickedOptions.appliance) || pickedOptions.appliance === '') {isValid = true}
    return isValid
  }

  const validUstensil = (recipe) => {
    let isValid = false
    recipe.ustensils.map((ustensil) => {
      if((ustensil === pickedOptions.ustensil) || pickedOptions.ustensil === '') {
        return isValid = true;
      }
    })
    return isValid
  }

  filteredList = filteredList.filter(validIngredient)

  filteredList = filteredList.filter(validAppliance)

  filteredList = filteredList.filter(validUstensil)

  return filteredList;
};

export const sortRecipes = (recipes, input, options) => {
  const filteredList = sortByInput(recipes, input);
  const sortedList = sortByOptions(filteredList, options);

  return sortedList;
};