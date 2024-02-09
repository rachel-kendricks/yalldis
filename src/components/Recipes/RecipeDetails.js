import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";
import { createUserRecipe } from "../services/userRecipesService";
import Button from "react-bootstrap/Button";

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
          <Button variant="success" onClick={handleAddToMyList}>
            Add to My List
          </Button>
        </div>
        {currentUser.isAdministrator ? (
          <Button
            variant="secondary"
            onClick={() => {
              navigate(`/recipes/${recipeId}/editrecipe`);
            }}
          >
            Edit Recipe
          </Button>
        ) : (
          ""
        )}
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
              return <li key={recipeIngredient.id}>{recipeIngredient.name}</li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
