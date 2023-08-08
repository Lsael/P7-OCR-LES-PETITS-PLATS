import { useThumbnailTemplate } from "../templates/thumbnailTemplate.js"

export const displaySearchResults = (recipes) => {
    const searchElement = document.querySelector('.search-result')

    for(let i=0; i < recipes.length; i++) {
        searchElement.innerHTML += useThumbnailTemplate(recipes[i])
    }
}