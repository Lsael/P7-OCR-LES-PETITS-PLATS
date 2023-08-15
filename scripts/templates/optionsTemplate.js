export const useOptionsTemplate = (category, options) => {
  return `
    <option value="">${category}</option>
    ${options.map((option) => {
      return `<option value="${option}">${option}</option>`
    })}
    `;
};
