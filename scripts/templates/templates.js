import { translateTitle } from "../utils/utils.js";

export const useOptionsTemplate = (category, pickedOptions, options) => {
  return `
    <div class="options-title">
      <h3>${category}</h3>
      <span>&#10094;</span>
    </div>
    <div class="options-menu" style="opacity: 0;">
      <input type="search" class="${translateTitle(category)}-search" />
      ${pickedOptions ? pickedOptions.map(pickedOption => {
        return `<span class="${translateTitle(category)} option active-option">${pickedOption}</span>`;
      }).join('') : ""}
      <ul class="${translateTitle(category)}-menu">
      ${options.map((option) => {
        return `<li class="${translateTitle(category)} option">${option}</li>`;
      }).join('')}
      </ul>
    </div>
    `;
};

export const usePickedOptionTemplate = (category, option) => {
  return `
  <p>
    <span class="${category} option-remove-title">${option}</span>
    <img class="option-remove" src="./assets/images/cross.png" alt="remove option">
  </p>`
}

export const useThumbnailTemplate = (recipe) => {
  const { name, image, time, description, ingredients } = recipe;

  return `
    <article class='recipe'>
        <span class="recipe__time">${time}min</span>
        <img src='assets/images/${image}' alt='${name}' class="recipe__image"/>
        <div class="recipe__title">
          <h2>${name}</h2>
        </div>
        <div class="recipe__description">
            <h3>Recette</h3>
            <span>${description}</span>
        </div>
        <div class="recipe__ingredients">
            <h3>Ingrédients</h3>
            <div class="recipe__ingredients-list">
            ${ingredients
              .map((ingredient) => {
                // need to add units
                return `
                    <div>
                        <span class="recipe__ingredients-element">${ingredient.ingredient}</span>
                        <span class="recipe__ingredients-quantity">${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</span>
                    </div>
                `;
              })
              .join('')}
            </div>
        </div>
    </article>
    `;
};
