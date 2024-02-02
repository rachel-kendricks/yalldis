import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";
import { createUserRecipe } from "../services/userRecipesService";

export const RecipeDetails = ({ currentUser, ingredients }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeIngredientIds, setRecipeIngredientIds] = useState([]);
  const navigate = useNavigate();

  const getRecipe = (recipeId) => {
    getRecipeById(recipeId).then((recipe) => {
      const recipeObj = recipe[0];
      setRecipe(recipeObj);
      console.log("setRecipe()");
    });
  };

  const getAndSetRecipeIngredients = () => {
    console.log("recipeIngredientIds");
    console.log(recipeIngredientIds);
    if (recipeIngredientIds) {
      const recipeIngredientArr = [];
      const theRecipeIngredientIds = recipeIngredientIds;
      for (const ingredient of ingredients) {
        for (const obj of theRecipeIngredientIds) {
          if (ingredient.id === obj.ingredientId) {
            recipeIngredientArr.push(ingredient);
          }
        }
      }
      setRecipeIngredients(recipeIngredientArr);
    }
  };

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

  useEffect(() => {
    const theRecipeIngredients = recipe?.recipeIngredients;
    setRecipeIngredientIds(theRecipeIngredients);
  }, [recipe]);

  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  useEffect(() => {
    getAndSetRecipeIngredients();
  }, [recipeIngredientIds]);

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
            navigate("/editRecipe");
          }}
        >
          Edit Recipe
        </button>
      </section>
      <section>
        <img src={recipe.image} alt="spinach and tomato omelette" />
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
