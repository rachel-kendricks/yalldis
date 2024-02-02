import { useEffect, useState } from "react";
import {
  deleteUserRecipe,
  getUserRecipes,
  getUserRecipesById,
} from "../services/userRecipesService";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";

export const GroceryList = ({ currentUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [groceryListIngredients, setGroceryListIngredients] = useState([]);
  const navigate = useNavigate();

  const getAndSetRecipes = () => {
    const recipesArr = [];
    const allRecipes = getRecipes().then((theRecipes) => {
      for (const recipe of theRecipes) {
        for (const userRecipe of userRecipes) {
          if (
            recipe.id === userRecipe.recipeId &&
            currentUser.id === userRecipe.userId
          ) {
            recipesArr.push(recipe);
          }
        }
      }
      setRecipes(recipesArr);
    });
  };

  const getAndSetIngredients = () => {
    getIngredients().then((ingredients) => {
      setIngredients(ingredients);
    });
  };

  const getAndSetUserRecipes = () => {
    getUserRecipes().then((theUserRecipes) => {
      setUserRecipes(theUserRecipes);
    });
  };

  const getAndSetGroceryListIngredients = () => {
    let ingredientsArr = [];

    for (const ingredient of ingredients) {
      for (const recipeObj of recipes) {
        let recipeIngredients = recipeObj.recipeIngredients;

        for (const recipeIngredient of recipeIngredients) {
          if (ingredient.id === recipeIngredient.ingredientId) {
            ingredientsArr.push(ingredient);
          }
        }
      }
    }
    console.log(ingredientsArr);

    //rewrite this code******
    const uniqueItemsArray = ingredientsArr.filter((item, index, self) => {
      // Check if the item's id is the first occurrence in the array
      return index === self.findIndex((t) => t.id === item.id);
    });

    setGroceryListIngredients(uniqueItemsArray);
  };

  useEffect(() => {
    getAndSetRecipes();
  }, [userRecipes]);

  useEffect(() => {
    getAndSetIngredients();
  }, []);

  useEffect(() => {
    getAndSetUserRecipes();
  }, []);

  useEffect(() => {
    getAndSetGroceryListIngredients();
  }, [recipes, ingredients, userRecipes]);

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
                    onClick={(event) => {
                      const userRecipeToDelete = userRecipes.find(
                        (userRecipe) =>
                          userRecipe.userId === currentUser.id &&
                          userRecipe.recipeId === recipe.id
                      );
                      deleteUserRecipe(userRecipeToDelete?.id);
                      getAndSetUserRecipes();
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
