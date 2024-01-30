import { useEffect, useState } from "react";
import {
  deleteUserRecipe,
  getUserRecipesById,
} from "../services/userRecipesService";
import { useNavigate } from "react-router-dom";
import { getIngredientsByRecipeId } from "../services/recipeIngredientsService";

export const GroceryList = ({ currentUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const getAndSetRecipesByUserId = () => {
    getUserRecipesById(currentUser.id).then((recipes) => {
      setRecipes(recipes);
    });
  };

  const getAndSetIngredients = () => {
    let ingredientsArr = [];
    recipes.map((recipe) => {
      getIngredientsByRecipeId(recipe.recipeId).then((theIngredients) => {
        ingredientsArr.push(...theIngredients);
      });
    });
    setIngredients(ingredientsArr);
  };

  useEffect(() => {
    getAndSetRecipesByUserId();
  }, [currentUser]);

  useEffect(() => {
    getAndSetIngredients();
  }, [recipes]);

  return (
    <div>
      <section>
        <h2>My Grocery List</h2>
        <div>
          <ul>
            {ingredients.map((ingredient) => {
              console.log(ingredient.ingredient.name);
              return <li key={ingredient.id}>{ingredient.ingredient.name}</li>;
            })}
          </ul>
        </div>
      </section>
      <section>
        <h2>My Recipes</h2>
        <div>
          <ul>
            {recipes.map((recipe) => {
              console.log(recipe.recipe.title);
              return (
                <li key={recipe.id}>
                  {recipe.recipe.title}
                  <button
                    onClick={() => {
                      deleteUserRecipe(recipe.id);
                      getAndSetRecipesByUserId();
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section>
        <button
          onClick={() => {
            navigate("/recipes");
          }}
        >
          Add Recipes
        </button>
      </section>
    </div>
  );
};
