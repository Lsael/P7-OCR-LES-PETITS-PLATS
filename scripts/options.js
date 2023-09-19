import { displaySearch, getFilteredRecipes } from './pages/index.js';
import { useOptionsTemplate, usePickedOptionTemplate } from './templates/templates.js';
import { handleClickPickOption, handleClickRemoveOption } from './utils/listeners.js';
import { addOptionInURL, getSearchFromURL, RemoveOptionFromURL } from './url.js';
import { search } from './search.js';

const getOptions = (recipes, category) => {
  let options = [];
  switch (category) {
    case 'ingredients':
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          options.push(ingredient.ingredient);
        });
      });
      break;
    case 'appliances':
      recipes.forEach((recipe) => {
        options.push(recipe.appliance);
      });
      break;
    case 'ustensils':
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => options.push(ustensil));
      });
      break;
  }

  options = [...new Set(options)];
  options.sort();
  return options;
};

const getSortingOptions = () => {
  const recipes = getFilteredRecipes();

  return {
    ingredients: getOptions(recipes, 'ingredients'),
    appliances: getOptions(recipes, 'appliances'),
    ustensils: getOptions(recipes, 'ustensils')
  };
};

// TODO : à Factoriser
// Bug : Parfois les "picked options" apparaissent toujours dans la liste

export const displaySortingOptions = () => {
  const recipes = getFilteredRecipes();
  let { ingredients, appliances, ustensils } = getSortingOptions(recipes);
  const pickedOptions = getSearchFromURL().options;

  if (pickedOptions.ingredients) {
    ingredients = ingredients.filter((ingredient) => !search(pickedOptions.ingredients, ingredient));
  }
  const ingredientsOptionsElement = document.querySelector('.ingredients-options');
  ingredientsOptionsElement.innerHTML = useOptionsTemplate('Ingrédients', pickedOptions.ingredients, ingredients);

  if (pickedOptions.appliances) {
    appliances = appliances.filter((appliance) => !search(pickedOptions.appliances, appliance));
  }
  const appliancesOptionsElement = document.querySelector('.appliances-options');
  appliancesOptionsElement.innerHTML = useOptionsTemplate('Appareils', pickedOptions.appliances, appliances);

  if (pickedOptions.ustensils) {
    ustensils = ustensils.filter((ustensil) => !search(pickedOptions.ustensils, ustensil));
  }
  const ustensilsOptionsElement = document.querySelector('.ustensils-options');
  ustensilsOptionsElement.innerHTML = useOptionsTemplate('Ustensiles', pickedOptions.ustensils, ustensils);
};

export const updateSortingOptions = (element) => {
  const category = element.classList[0].split('-')[0];
  const menuElement = document.querySelector(`.${category}-menu`);
  const input = element.value;
  let options = getSortingOptions()[category];

  options = options.filter((option) => {
    return option.toUpperCase().match(input.toUpperCase());
  });

  menuElement.innerHTML = '';
  options.forEach((option) => {
    menuElement.innerHTML += `<li class="${category} option">${option}</li>`;
  });
  handleClickPickOption();
};

export const OpenCloseOptionsMenu = (element, index) => {
  const arrow = element.children[1];
  const menu = document.querySelectorAll(`.options-menu`)[index];

  if (menu.style.opacity == 1) {
    arrow.style.rotate = '0deg';
    menu.style.opacity = '0';
    menu.style.transform = 'translate(0,-9999px)';
  } else if (menu.style.opacity == 0) {
    arrow.style.rotate = '180deg';
    menu.style.opacity = '1';
    menu.style.transform = 'translate(0, -8px)';
  }
};

export const pickOption = (element) => {
  const category = element.classList[0];
  const optionTitle = element.textContent;

  addOptionInURL(category, optionTitle);
  displayPickedOptions();
  displaySearch();
};

export const removeOption = (index) => {
  const option = document.querySelectorAll('.option-remove-title')[index];
  const category = option.classList[0];
  const optionTitle = option.textContent;

  RemoveOptionFromURL(category, optionTitle);
  displayPickedOptions();
};

export const displayPickedOptions = () => {
  const { options } = getSearchFromURL();
  const pickedOptionSection = document.querySelector('.picked-options');
  pickedOptionSection.innerHTML = '';

  for (const category in options) {
    if (options[category]) {
      const optionsToDisplay = options[category];
      optionsToDisplay.forEach((element) => {
        pickedOptionSection.innerHTML += usePickedOptionTemplate(category, element);
      });
    }
  }

  handleClickRemoveOption();
};
