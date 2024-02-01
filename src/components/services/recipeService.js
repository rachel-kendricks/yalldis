export const getRecipes = () => {
  return fetch(
    `http://localhost:8088/recipes?_embed=recipeIngredients&_embed=userRecipes&_expand=mealType`
  ).then((res) => res.json());
};
