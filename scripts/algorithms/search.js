import { recipes } from "../../database/recipes.js"
import { useThumbnailTemplate } from "../templates/thumbnailTemplate.js"

const getSearchInput = () => {
    const searchInput = document.querySelector("#searchInput").value

    return searchInput
}

const getRecipes = () => {
    const input = getSearchInput()

    const newList = recipes.filter((recipe) => recipe.name.toUpperCase().match(input.toUpperCase()))
    return newList
}

export const displaySearchResults = () => {
    const recipes = getRecipes()
    const searchElement = document.querySelector('.search-result')
    searchElement.innerHTML = ""


    for(let i=0; i < recipes.length; i++) {
        searchElement.innerHTML += useThumbnailTemplate(recipes[i])
    }
}