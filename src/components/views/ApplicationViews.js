import { useEffect, useState } from "react";
import { AdministratorViews } from "./AdministratorViews";
import { UserViews } from "./UserViews";
import { getIngredients } from "../services/ingredientsService";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const getAndSetIngredients = () => {
    getIngredients().then((ingredients) => {
      setIngredients(ingredients);
    });
  };

  useEffect(() => {
    getAndSetIngredients();
    console.log("getAndSetIngredients()");
  }, []); //recipes

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
    />
  ) : (
    <UserViews currentUser={currentUser} />
  );
};
