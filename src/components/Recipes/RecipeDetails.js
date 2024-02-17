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
    <div className="recipes-container">
      <section>
        <div className="recipes-header">
          <h1>{recipe.title}</h1>
        </div>
        <div className="recipe-filters">
          <div className="recipe-filter-item">
            <Button variant="success" onClick={handleAddToMyList}>
              Add to My List
            </Button>
          </div>
          <div className="recipe-filter-item">
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
          </div>
        </div>
      </section>
      <section>
        <img src={recipe.image} alt={recipe.title} className="recipe-img" />

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
