export const getIngredientsByRecipeId = async (id) => {
  return await fetch(
    `http://localhost:8088/recipeIngredients?recipeId=${id}&_expand=ingredient`
  ).then((res) => res.json());
};

export const removeIngredientsFromDatabase = (
  ingredientsRemoved,
  recipeIngredientIds
) => {
  console.log("delete from database");
  const promises = ingredientsRemoved.map((ingredient) => {
    const theRecipeIngredient = recipeIngredientIds.find(
      (item) => item.ingredientId === ingredient.id
    );
    console.log(theRecipeIngredient);
    return fetch(
      `http://localhost:8088/recipeIngredients/${theRecipeIngredient.id}`,
      {
        method: "DELETE",
      }
    );
  });
  return Promise.all(promises);
};

export const addIngredientsToDatabase = (ingredientsAdded, recipe) => {
  console.log("post to database");
  const promises = ingredientsAdded.map((ingredient) => {
    console.log(ingredient);
    return fetch(`http://localhost:8088/recipeIngredients/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe.id,
        ingredientId: ingredient.id,
      }),
    });
  });
  return Promise.all(promises);
};
