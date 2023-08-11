import { displaySearchResults } from "../algorithms/search.js"

const initHome = () => {
    displaySearchResults()
    document.querySelector("#searchInput").addEventListener("input", displaySearchResults)
}

initHome()