import { useOptionsTemplate, usePickedOptionTemplate } from "../templates/templates.js";

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

export const displayOptionsMenu = (element, index) => {
  const arrow = element.children[1]
  const menu = document.querySelectorAll(`.options-menu`)[index];

  if(menu.style.opacity == 1) {
    arrow.style.rotate = "0deg"
    menu.style.opacity = "0";
    menu.style.transform = "translate(0,-9999px)";
  } else if(menu.style.opacity == 0) {
    arrow.style.rotate = "180deg"
    menu.style.opacity = "1";
    menu.style.transform = "translate(0, -8px)";
  }
};

const handleClickRemoveOption = () => {
  document.querySelectorAll('.option-remove').forEach((element, index) => element.addEventListener('click', () => removeOption(index)));
}

export const pickOption = (element) => {
  const option = element.textContent
  const pickedOptionElement = document.querySelector(".picked-options")

  pickedOptionElement.innerHTML += usePickedOptionTemplate(option)

  handleClickRemoveOption()
}

export const removeOption = (index) => {
  const option = document.querySelectorAll('.picked-options > p')[index]

  if(option) {
    option.remove()
  }

  handleClickRemoveOption()
}