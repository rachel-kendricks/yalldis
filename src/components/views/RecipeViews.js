import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { AdministratorNav } from "../nav/AdministratorNav";
import { RecipeDetails } from "../Recipes/RecipeDetails";
import { EditRecipe } from "../Recipes/EditRecipe";
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeService";

export const RecipeViews = ({ currentUser, ingredients, mealTypes }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeIngredientIds, setRecipeIngredientIds] = useState([]);

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

  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  useEffect(() => {
    getAndSetRecipeIngredients();
  }, [recipeIngredientIds]);

  useEffect(() => {
    const theRecipeIngredients = recipe?.recipeIngredients;
    setRecipeIngredientIds(theRecipeIngredients);
  }, [recipe]);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <RecipeDetails
              currentUser={currentUser}
              ingredients={ingredients}
              mealTypes={mealTypes}
              recipeId={recipeId}
              recipe={recipe}
              recipeIngredients={recipeIngredients}
              recipeIngredientIds={recipeIngredientIds}
            />
          }
        />

        <Route
          path="editrecipe"
          element={
            <EditRecipe
              ingredients={ingredients}
              currentUser={currentUser}
              mealTypes={mealTypes}
              recipeId={recipeId}
              recipe={recipe}
              recipeIngredients={recipeIngredients}
              recipeIngredientIds={recipeIngredientIds}
            />
          }
        />
      </Route>
    </Routes>
  );
};
