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

export const postRecipe = (newRecipe) => {
  return fetch(`http://localhost:8088/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });
};

export const updateRecipe = (recipeId, updatedRecipe) => {
  return fetch(`http://localhost:8088/recipes/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRecipe),
  });
};

export const deleteRecipe = (id) => {
  return fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  });
};
