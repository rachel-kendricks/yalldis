import { Outlet, Route, Routes } from "react-router-dom";
import { AdministratorNav } from "../nav/AdministratorNav";
import { Welcome } from "../Welcome/Welcome";
import { GroceryList } from "../GroceryList/GroceryList";
import { Recipes } from "../Recipes/Recipes";
import { RecipeDetails } from "../Recipes/RecipeDetails";
import { EditRecipe } from "../Recipes/EditRecipe";
import { Profile } from "../Profile/Profile";
import { AddRecipe } from "../Recipes/AddRecipe";

export const AdministratorViews = ({
  currentUser,
  ingredients,
  setIngredients,
  mealTypes,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AdministratorNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="grocerylist"
          element={<GroceryList currentUser={currentUser} />}
        />
        <Route path="/recipes">
          <Route index element={<Recipes mealTypes={mealTypes} />} />
          <Route
            path=":recipeId"
            element={
              <RecipeDetails
                currentUser={currentUser}
                ingredients={ingredients}
              />
            }
          />
          <Route
            path=":recipeId/editrecipe"
            element={
              <EditRecipe
                ingredients={ingredients}
                currentUser={currentUser}
                mealTypes={mealTypes}
              />
            }
          />
        </Route>
        {/* <Route path="editrecipe" element={<EditRecipe />} /> */}
        <Route
          path="addrecipe"
          element={
            <AddRecipe ingredients={ingredients} mealTypes={mealTypes} />
          }
        />
        <Route path="profile" element={<Profile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
