import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";
import { createUserRecipe } from "../services/userRecipesService";

export const RecipeDetails = ({
  currentUser,
  ingredients,
  recipeId,
  recipe,
  recipeIngredients,
  recipeIngredientIds,
}) => {
  const navigate = useNavigate();

  const handleAddToMyList = (event) => {
    event.preventDefault();
    console.log(currentUser);

    const newUserRecipe = {
      recipeId: recipe.id,
      userId: currentUser.id,
    };

    console.log(newUserRecipe);

    createUserRecipe(newUserRecipe);
    navigate("/grocerylist");
  };

  return (
    <div>
      <section>
        <h1>Recipe Details</h1>
        <div>
          {" "}
          <button onClick={handleAddToMyList}>Add to My List</button>
        </div>

        <button
          onClick={() => {
            navigate(`/recipes/${recipeId}/editrecipe`);
          }}
        >
          Edit Recipe
        </button>
      </section>
      <section>
        <img src={recipe.image} alt={recipe.title} />
        <div>
          <h3>{recipe.title}</h3>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{recipe.description}</p>
        </div>
        <div>
          <h3>Directions: </h3>
          <p>{recipe.instructions}</p>
        </div>
        <div>
          <h3>Ingredients: </h3>
          <ul>
            {recipeIngredients.map((recipeIngredient) => {
              return <li key={recipeId.id}>{recipeIngredient.name}</li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
