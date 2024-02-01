import { useEffect, useState } from "react";
import { deleteUserRecipe } from "../services/userRecipesService";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";

export const GroceryList = ({ currentUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [groceryListIngredients, setGroceryListIngredients] = useState([]);
  const navigate = useNavigate();

  const getAndSetRecipes = () => {
    getRecipes().then((theRecipes) => {
      const userRecipes = theRecipes.filter(
        (recipe) => recipe.userRecipes[0]?.userId === currentUser.id
      );
      setRecipes(userRecipes);
    });
  };

  const getAndSetIngredients = () => {
    getIngredients().then((ingredients) => {
      setIngredients(ingredients);
    });
  };

  const getAndSetGroceryListIngredients = () => {
    let ingredientsArr = [];
    console.log("recipes:");
    console.log(recipes);
    console.log("ingredients:");
    console.log(ingredients);
    for (const ingredient of ingredients) {
      console.log("ingredient:");
      console.log(ingredient);
      for (const recipeObj of recipes) {
        let recipeIngredients = recipeObj.recipeIngredients;
        console.log("recipe ingredients:");
        console.log(recipeIngredients);
        for (const recipeIngredient of recipeIngredients) {
          console.log("single ingredient:");
          console.log(recipeIngredient);
          if (ingredient.id === recipeIngredient.ingredientId) {
            ingredientsArr.push(ingredient);
          }
        }
      }
    }
    setGroceryListIngredients(ingredientsArr);
  };

  useEffect(() => {
    getAndSetRecipes();
    console.log("getAndSetRecipes()");
  }, []);

  useEffect(() => {
    getAndSetIngredients();
    console.log("getAndSetIngredients()");
  }, []); //recipes

  useEffect(() => {
    getAndSetGroceryListIngredients();
    console.log("getAndSetGroceryListIngredients()");
  }, [recipes, ingredients]);

  return (
    <div>
      <section>
        <h2>My Grocery List</h2>
        <div>
          <ul>
            {groceryListIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.name}</li>;
            })}
          </ul>
        </div>
      </section>
      <section>
        <h2>My Recipes</h2>
        <div>
          <ul>
            {recipes.map((recipe) => {
              return (
                <li key={recipe.id}>
                  {recipe.title}
                  <button
                    onClick={() => {
                      deleteUserRecipe(recipe.id);
                      getAndSetRecipes();
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
