export const getSearchInput = () => {
  const searchInput = document.querySelector('#searchInput').value;

  return searchInput;
};

export const getPickedOptions = () => {
  const ingredient = document.querySelector('.ingredients-options').value;
  const appliance = document.querySelector('.appliances-options').value;
  const ustensil = document.querySelector('.ustensils-options').value;

  return { ingredient, appliance, ustensil };
};

export const displayRecipesCount = (count) => {
  const recipesCountElement = document.querySelector('#recipes-count');

  if (count === 0) {
    recipesCountElement.innerText = '0 recette';
  } else {
    recipesCountElement.innerText = count + ' recettes';
  }
};