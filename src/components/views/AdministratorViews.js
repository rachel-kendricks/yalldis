import { Outlet, Route, Routes } from "react-router-dom";
import { AdministratorNav } from "../nav/AdministratorNav";
import { Welcome } from "../Welcome/Welcome";
import { GroceryList } from "../GroceryList/GroceryList";
import { Recipes } from "../Recipes/Recipes";
import { RecipeDetails } from "../Recipes/RecipeDetails";
import { EditRecipe } from "../Recipes/EditRecipe";

export const AdministratorViews = ({ currentUser }) => {
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
        <Route path="grocerylist" element={<GroceryList />} />
        <Route path="recipes">
          <Route index element={<Recipes />} />
          <Route path=":recipeId" element={<RecipeDetails />}>
            <Route index element={<RecipeDetails />} />
            {/* <Route path="/edit" element={<EditRecipe />} /> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
