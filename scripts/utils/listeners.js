import { OpenCloseOptionsMenu, pickOption, removeOption, updateSortingOptions } from "../algorithm/options.js";
import { displaySearch } from "../pages/index.js";

export const handleMainSearchInput = () => {
    document.querySelector('#searchInput').addEventListener('input', displaySearch);
}

export const handleMenuOpenClose = () => {
    document.querySelectorAll('.options-title').forEach((element, index) => element.addEventListener('click', () => OpenCloseOptionsMenu(element, index)));
}

export const handleOptionSearchInput = () => {
    document.querySelectorAll('.options-menu > input').forEach((element) => element.addEventListener('input',() => updateSortingOptions(element)));
}

export const handleClickPickOption = () => {
    document.querySelectorAll('.option').forEach((element) => element.addEventListener('click', () => pickOption(element)));
}
  
export const handleClickRemoveOption = () => {
    document.querySelectorAll('.option-remove').forEach((element, index) => element.addEventListener('click', () => removeOption(index)));
    displaySearch()
}