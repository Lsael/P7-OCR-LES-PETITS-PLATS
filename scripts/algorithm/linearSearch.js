export const search = (list, searchTerm) => {
    let result = false;
    let count = 0
    for(let element of list) {
      if(element.toUppercase() == searchTerm.toUppercase()) {
        result = true
        break;
      }
      count += 1
    }
    console.log(count + "tries");
    return result
  }

/* const test = ["a","c","b","v","e","z","j","r","t"]
  
console.log(linearSearch(test, "t")) */