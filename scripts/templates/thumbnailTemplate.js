export const useThumbnailTemplate = (recipe) => {
  const { name, image, time, description, ingredients } = recipe;

  return `
    <article class='recipe-thumbnail'>
        <span>${time}min</span>
        <img src='assets/images/${image}' alt='${name}' class="recipe-image"/>
        <h2>${name}</h2>
        <div>
            <h3>Recette</h3>
            <span>${description}</span>
        </div>
        <div>
            <h3>Ingrédients</h3>
            ${ingredients.map((ingredient) => {
                // need to add units
                return `
                    <div>
                        <span>${ingredient.ingredient}</span>
                        <span>${ingredient.quantity}</span>
                    </div>
                `
                })
            }
        </div>
    </article>
    `;
};
