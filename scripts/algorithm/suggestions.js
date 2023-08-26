/* import { getSearchInput } from "../utils/utils.js"
import { getFilteredRecipes } from "../pages/index.js"

const getSuggestions = () => {
    const filteredrecipes = getFilteredRecipes();

    let suggestions = []
    filteredrecipes.forEach((recipe) => {
        console.log(recipe)
        recipe.name.split(' ').forEach((word) => {
            if(word.length >= 3) {
                suggestions.push(word.toLowerCase())
            }})
    })

    console.log(suggestions)
    return suggestions
}

export const displaySuggestions = () => {
    const input = getSearchInput()
    const suggestionsElement = document.querySelector(".suggestions")
    
    if(input.length >= 3) {
        const suggestions = getSuggestions()
        suggestionsElement.innerHTML = ''
        
        suggestions.forEach((suggestion) => {
            suggestionsElement.innerHTML += `<li>${suggestion}</li>`
        })
    } else {
        suggestionsElement.innerHTML = ''
    }
  } */