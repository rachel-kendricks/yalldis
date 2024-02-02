export const getRecipes = () => {
  return fetch(
    `http://localhost:8088/recipes?_embed=recipeIngredients&_embed=userRecipes&_expand=mealType`
  ).then((res) => res.json());
};

export const getRecipeById = (id) => {
  return fetch(
    `http://localhost:8088/recipes?id=${id}&_embed=recipeIngredients`
  ).then((res) => res.json());
};
