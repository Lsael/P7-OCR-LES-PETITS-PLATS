import { displaySearch, getFilteredRecipes } from "../pages/index.js";
import { useOptionsTemplate, usePickedOptionTemplate } from "../templates/templates.js";
import { handleClickPickOption, handleClickRemoveOption } from "../utils/listeners.js";
import { addOptionInURL, getSearchFromURL, RemoveOptionFromURL } from "./url.js";

const getOptions = (recipes, category) => {
  let options = [];
  switch(category) {
    case 'ingredients': recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
          options.push(ingredient.ingredient)
      });
    })
    break;
    case 'appliances': recipes.forEach((recipe) => {
      options.push(recipe.appliance);
    })
    break;
    case 'ustensils': recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => options.push(ustensil));
    })
    break;
  }

  const filteredOptions = [...new Set(options)];
  return filteredOptions;
};

const getSortingOptions = () => {
  const recipes = getFilteredRecipes()

    return {
      ingredients: getOptions(recipes, 'ingredients'),
      appliances: getOptions(recipes, 'appliances'),
      ustensils:getOptions(recipes, 'ustensils')
  };
};

export const updateSortingOptions = (element) => {
  const category = element.classList[0].split('-')[0]
  const menuElement = document.querySelector(`.${category}-menu`)
  const input = element.value
  let options = getSortingOptions()[category]

  options = options.filter((option) => {
    return option.toUpperCase().match(input.toUpperCase())
  })
  
  menuElement.innerHTML = ""
  options.forEach((option) => {
    menuElement.innerHTML += `<li class="${category} option">${option}</li>`
  })
  handleClickPickOption()
}

export const displaySortingOptions = () => {
    const recipes = getFilteredRecipes()
    const { ingredients, appliances, ustensils } = getSortingOptions(recipes);
    const ingredientsOptionsElement = document.querySelector('.ingredients-options');
    const appliancesOptionsElement = document.querySelector('.appliances-options');
    const ustensilsOptionsElement = document.querySelector('.ustensils-options');

    ingredientsOptionsElement.innerHTML = useOptionsTemplate('Ingrédients', ingredients);
    appliancesOptionsElement.innerHTML = useOptionsTemplate('Appareils', appliances);
    ustensilsOptionsElement.innerHTML = useOptionsTemplate('Ustensiles', ustensils);
};

export const OpenCloseOptionsMenu = (element, index) => {
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

export const pickOption = (element) => {
  const category = element.classList[0]
  const optionTitle = element.textContent

  addOptionInURL(category, optionTitle)
  displayPickedOptions()
  displaySearch()
}

export const removeOption = (index) => {
  const option = document.querySelectorAll('.option-remove-title')[index]
  const category = option.classList[0]
  const optionTitle = option.textContent

  RemoveOptionFromURL(category, optionTitle)
  displayPickedOptions()
}

const displayPickedOptions = () => {
  const { options } = getSearchFromURL()
  const pickedOptionSection = document.querySelector('.picked-options')
  pickedOptionSection.innerHTML = ''

  for(const option in options) {
    if(options[option]){
      const optionToDisplay = (options[option].length > 1) ? options[option].split(',') : options[option]
      optionToDisplay.forEach((element) => {
        pickedOptionSection.innerHTML += usePickedOptionTemplate(option, element)
      })
    }
  }

  handleClickRemoveOption()
}