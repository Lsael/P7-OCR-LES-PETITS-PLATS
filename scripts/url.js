export const addOptionInURL = (category, option) => {
  const url = new URL(window.location);
  let optionList = url.searchParams.get(category);
  if (optionList) {
    optionList = optionList.split(',');
  } else {
    optionList = [];
  }
  optionList.push(option);
  url.searchParams.set(category, [...new Set(optionList)]);
  window.history.replaceState('', '', url);
};

export const RemoveOptionFromURL = (category, option) => {
  const url = new URL(window.location);
  let optionList = url.searchParams.get(category);
  if (optionList) {
    optionList = optionList.split(',');
  } else {
    optionList = [];
  }
  optionList = optionList.filter((element) => element !== option);
  optionList.length !== 0 ? url.searchParams.set(category, [...new Set(optionList)]) : url.searchParams.delete(category);
  window.history.replaceState('', '', url);
};

export const updateTitleInURL = (title) => {
  const url = new URL(window.location);

  title.length >= 3 ? url.searchParams.set('title', title) : url.searchParams.delete('title');

  window.history.replaceState('', '', url);
};

export const getSearchFromURL = () => {
  const url = new URL(window.location);

  const getParam = (param) => {
    return url.searchParams.get(param);
  };

  return {
    title: getParam('title'),
    options: {
      ingredients: getParam('ingredients')?.split(','),
      appliances: getParam('appliances')?.split(','),
      ustensils: getParam('ustensils')?.split(',')
    }
  };
};
