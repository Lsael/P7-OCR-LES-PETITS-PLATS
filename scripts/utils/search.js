import { useThumbnailTemplate } from "../templates/thumbnailTemplate.js"

export const displaySearchResults = (recipes) => {
    const searchElement = document.querySelector('.search-result')
    searchElement.innerHTML = useThumbnailTemplate(recipes[0])
}