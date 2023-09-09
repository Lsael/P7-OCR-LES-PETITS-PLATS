
export const search = (list, searchTerm) => {
  let result = false;
  let startIndex = 0
  let endIndex = list.length - 1
  
  list.sort()

  while(startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2)
    if(list[middleIndex].toUpperCase() == searchTerm.toUpperCase()) {
      return result = true
    } else if(list[middleIndex] < searchTerm) {
      startIndex = middleIndex + 1
    } else if(list[middleIndex] > searchTerm) {
      endIndex = middleIndex - 1
    }
  }
  return result
}
