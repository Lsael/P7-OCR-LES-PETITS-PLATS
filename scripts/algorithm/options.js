import { useOptionsTemplate } from "../templates/templates.js";
import { displayOptionsMenu } from "../utils/utils.js";

const getSortOptions = (recipes) => {
    const getOptions = (category) => {
      let options = [];
      switch(category) {
        case 'ingredients': recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => options.push(ingredient.ingredient));
        })
        case 'appliances': recipes.forEach((recipe) => {
          options.push(recipe.appliance);
        })
        case 'ustensils': recipes.forEach((recipe) => {
          recipe.ustensils.forEach((ustensil) => options.push(ustensil));
        })
      }
  
      const filteredOptions = [...new Set(options)];
      return filteredOptions;
    };
  
    return {
      ingredients: getOptions('ingredients'),
      appliances: getOptions('appliances'),
      ustensils:getOptions('ustensils')
    };
  };
  
export const displaySortOptions = (recipes) => {
    const { ingredients, appliances, ustensils } = getSortOptions(recipes);
    const ingredientsOptionsElement = document.querySelector('.ingredients-options');
    const appliancesOptionsElement = document.querySelector('.appliances-options');
    const ustensilsOptionsElement = document.querySelector('.ustensils-options');

    ingredientsOptionsElement.innerHTML = useOptionsTemplate('Ingrédients', ingredients);
    appliancesOptionsElement.innerHTML = useOptionsTemplate('Appareils', appliances);
    ustensilsOptionsElement.innerHTML = useOptionsTemplate('Usentiles', ustensils);
};