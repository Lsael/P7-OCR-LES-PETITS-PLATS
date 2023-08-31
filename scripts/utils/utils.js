export const getSearchInput = () => {
  const searchInput = document.querySelector('#searchInput').value;

  return searchInput;
};

export const displayRecipesCount = (count) => {
  const recipesCountElement = document.querySelector('#recipes-count');

  if (count === 0) {
    recipesCountElement.innerText = '0 recette';
  } else {
    recipesCountElement.innerText = count + ' recettes';
  }
};