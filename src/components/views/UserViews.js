import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../Welcome/Welcome";
import { GroceryList } from "../GroceryList/GroceryList";
import { Recipes } from "../Recipes/Recipes";
import { Profile } from "../Profile/Profile";
import { UserNav } from "../nav/UserNav";
import { RecipeViews } from "./RecipeViews";
import { Footer } from "../footer/Footer";

export const UserViews = ({ currentUser, ingredients, mealTypes }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <UserNav />
            <Outlet />
            <Footer />
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
        <Route path="profile" element={<Profile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
