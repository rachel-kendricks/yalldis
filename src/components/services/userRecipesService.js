export const getUserRecipesById = async (id) => {
  return await fetch(
    `http://localhost:8088/userRecipes?userId=${id}&_expand=recipe&_expand=user`
  ).then((res) => res.json());
};

export const deleteUserRecipe = (id) => {
  return fetch(`http://localhost:8088/userRecipes/${id}`, {
    method: "DELETE",
  });
};
