export const getIngredientsByRecipeId = async (id) => {
  return await fetch(
    `http://localhost:8088/recipeIngredients?recipeId=${id}&_expand=ingredient`
  ).then((res) => res.json());
};
