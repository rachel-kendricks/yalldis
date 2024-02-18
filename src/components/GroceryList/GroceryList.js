import { useEffect, useState } from "react";
import {
  deleteUserRecipe,
  getUserRecipes,
  getUserRecipesById,
} from "../services/userRecipesService";
import { Link, useNavigate } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import { getIngredients } from "../services/ingredientsService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "../PDF/PDFFile";
import Button from "react-bootstrap/Button";
import "./GroceryList.css";

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
    <div className="grocery-list-container">
      <div className="grocery-list-header"></div>
      <div className="grocery-list-body">
        <section className="my-grocery-list montserrat-font-light">
          <div>
            <h2 className="grocery-list-title signika-font-bold">
              My Grocery List
            </h2>
          </div>
          <div>
            <ul>
              {groceryListIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.name}</li>;
              })}
            </ul>
            <div>
              <PDFDownloadLink
                document={
                  <PDFFile groceryListIngredients={groceryListIngredients} />
                }
                fileName="My Grocery List"
              >
                {({ loading }) =>
                  loading ? (
                    <Button variant="dark">Loading Document...</Button>
                  ) : (
                    <Button variant="dark" className="btn-download-pdf">
                      Download PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </section>
        <section className="my-recipes montserrat-font-light">
          <h2 className="grocery-list-title signika-font-bold">My Recipes</h2>
          <div className="my-recipes-list">
            <ul>
              {recipes.map((recipe) => {
                return (
                  <li key={recipe.id} className="recipe-hover">
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    <Button
                      variant="danger"
                      size="sm"
                      className="dlt-button"
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
                      <i class="fa-solid fa-trash"></i>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <Button
              variant="success"
              className="btn-add-recipe"
              onClick={() => {
                navigate("/recipes");
              }}
            >
              Add Recipes
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
