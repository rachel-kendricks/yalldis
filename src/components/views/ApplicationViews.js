import { useEffect, useState } from "react";
import { AdministratorViews } from "./AdministratorViews";
import { UserViews } from "./UserViews";
import { getIngredients } from "../services/ingredientsService";
import { getMealTypes } from "../services/mealTypeService";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);

  const getAndSetIngredients = () => {
    getIngredients().then((ingredients) => {
      setIngredients(ingredients);
    });
  };

  const getAndSetMealTypes = () => {
    getMealTypes().then((theMealTypes) => {
      setMealTypes(theMealTypes);
    });
  };

  useEffect(() => {
    getAndSetIngredients();
    console.log("getAndSetIngredients()");
  }, []); //recipes

  useEffect(() => {
    getAndSetMealTypes();
  }, []);

  useEffect(() => {
    const localYalldisUser = localStorage.getItem("yalldis_user");
    const yalldisUserObj = JSON.parse(localYalldisUser);
    setCurrentUser(yalldisUserObj);
  }, []);

  return currentUser.isAdministrator ? (
    <AdministratorViews
      currentUser={currentUser}
      ingredients={ingredients}
      setIngredients={setIngredients}
      mealTypes={mealTypes}
    />
  ) : (
    <UserViews currentUser={currentUser} />
  );
};
