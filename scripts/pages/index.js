import { recipes } from "../../database/recipes.js"
import { displaySearchResults } from "../utils/search.js"

const initHome = () => {
    displaySearchResults(recipes)
}

initHome()