import { recipes } from "../../database/recipes.js"
import { useThumbnailTemplate } from "../templates/thumbnailTemplate.js"

const getSearchInput = () => {
    const searchInput = document.querySelector("#searchInput").value

    return searchInput
}

const getSortOption = () => {
    // Will get the chosen option in selects
}

const sortRecipes = (searchInput) => {
    const sortedRecipesList = recipes.filter((recipe) => {
        // Will need to add ingredients in search
        const { name, description } = recipe
        const stringToTest = name + " " + description

        return stringToTest.toUpperCase().match(searchInput.toUpperCase())
    })
    
    return sortedRecipesList
}

const getRecipes = () => {
    const input = getSearchInput()

    const sortedRecipes = sortRecipes(input)
    return sortedRecipes
}

export const displaySearchResults = () => {
    const recipes = getRecipes()
    const searchElement = document.querySelector('.search-result')
    searchElement.innerHTML = ""


    for(let i=0; i < recipes.length; i++) {
        searchElement.innerHTML += useThumbnailTemplate(recipes[i])
    }
}