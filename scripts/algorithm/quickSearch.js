 export const search = (list, searchTerm) => {
    let result = false;
    let pivot = parseInt((list.length) / 2)
    let count = 0
    list.sort()
  
    for(let i=0; i < list.length; i++) {
      if(list[pivot].toUpperCase() == searchTerm.toUpperCase()) {
        return result = true
      } else if(list[pivot] < searchTerm) {
        pivot = parseInt((pivot + list.length) /2)
      } else if(list[pivot] > searchTerm) {
        pivot = parseInt(pivot / 2)
      }
      count += 1
    }
    console.log(count + "tries");
    return result
  }
  
/*   const test = ["a","c","b","v","e","z","j","r","t"]
  
  console.log(quickSearch(test, "t")) */