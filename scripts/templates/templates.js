export const useOptionsTemplate = (category, options) => {
  return `
    <div class="options-title">
      <h3>${category}</h3>
      <span>&#10094;</span>
    </div>
    <div class="options-menu" style="opacity: 0;">
      <input type="search" />
      <ul>
      ${options.map((option) => {
        return `<li class="option">${option}</li>`
      }).join('')}
      </ul>
    </div>
    `;
};

export const useThumbnailTemplate = (recipe) => {
  const { name, image, time, description, ingredients } = recipe;

  return `
    <article class='recipe'>
        <span class="recipe__time">${time}min</span>
        <img src='assets/images/${image}' alt='${name}' class="recipe__image"/>
        <h2 class="recipe__title">${name}</h2>
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
