import { recipes } from "../../database/recipes.js"
import { useThumbnailTemplate } from "../templates/thumbnailTemplate.js"

const search = () => {
    const searchElement = document.querySelector('.search-result')
    searchElement.innerHTML = useThumbnailTemplate(recipes[0])
}

search()