import { Outlet, Route, Routes } from "react-router-dom";
import { AdministratorNav } from "../nav/AdministratorNav";
import { Welcome } from "../Welcome/Welcome";
import { GroceryList } from "../GroceryList/GroceryList";
import { Recipes } from "../Recipes/Recipes";
import { Profile } from "../Profile/Profile";
import { AddRecipe } from "../Recipes/AddRecipe";
import { RecipeViews } from "./RecipeViews";

export const AdministratorViews = ({ currentUser, ingredients, mealTypes }) => {
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
          <Route
            index
            element={
              <Recipes mealTypes={mealTypes} currentUser={currentUser} />
            }
          />
          <Route
            path=":recipeId/*"
            element={
              <RecipeViews
                currentUser={currentUser}
                ingredients={ingredients}
                mealTypes={mealTypes}
              />
            }
          />
        </Route>
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
