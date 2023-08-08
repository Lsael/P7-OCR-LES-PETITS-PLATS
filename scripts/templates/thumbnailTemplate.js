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
            ${ingredients.map((ingredient) => {
                // need to add units
                return `
                    <div>
                        <span>${ingredient.ingredient}</span>
                        <span>${ingredient.quantity}</span>
                    </div>
                `
                }).join('')
            }
        </div>
    </article>
    `;
};
