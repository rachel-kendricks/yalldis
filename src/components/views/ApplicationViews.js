import { useEffect, useState } from "react";
import { AdministratorViews } from "./AdministratorViews";
import { UserViews } from "./UserViews";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localYalldisUser = localStorage.getItem("yalldis_user");
    const yalldisUserObj = JSON.parse(localYalldisUser);

    setCurrentUser(yalldisUserObj);
  }, []);

  return currentUser.isAdministrator ? (
    <AdministratorViews currentUser={currentUser} />
  ) : (
    <UserViews currentUser={currentUser} />
  );
};
