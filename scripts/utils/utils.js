export const getSearchInput = () => {
  const searchInput = document.querySelector('#searchInput').value;

  return searchInput;
};

export const getOptionsInput = (category) => {
  const optionInput = document.querySelector(`.${category}-search`)?.value
  console.log(optionInput)
}

export const displayRecipesCount = (count) => {
  const recipesCountElement = document.querySelector('#recipes-count');

  if (count === 0) {
    recipesCountElement.innerText = '0 recette';
  } else {
    recipesCountElement.innerText = count + ' recettes';
  }
};

export const translateTitle = (title) => {
  switch(title) {
    case "Ingrédients":
      return "ingredients";
    case "Appareils":
      return "appliances";
    case "Ustensiles":
      return "ustensils";
  }
}