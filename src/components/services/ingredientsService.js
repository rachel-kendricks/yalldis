export const getIngredients = () => {
  return fetch(`http://localhost:8088/ingredients`).then((res) => res.json());
};
