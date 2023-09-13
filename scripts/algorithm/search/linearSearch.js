
export const search = (list, searchTerm) => {
    let result = false;
    for(let element of list) {
      if(element.toUpperCase() == searchTerm.toUpperCase()) {
        return result = true
      }
    }
    return result
  }