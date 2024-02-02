export const getUserRecipes = async () => {
  return await fetch(`http://localhost:8088/userRecipes`).then((res) =>
    res.json()
  );
};

export const deleteUserRecipe = (id) => {
  return fetch(`http://localhost:8088/userRecipes/${id}`, {
    method: "DELETE",
  });
};

export const createUserRecipe = (newUserRecipe) => {
  return fetch(`http://localhost:8088/userRecipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserRecipe),
  });
};
