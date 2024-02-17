import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const AdministratorNav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/Y’alldis_logo.png"}
            alt="yalldis logo"
            className="img-logo"
          />
        </Link>
      </div>
      <ul className="nav nav-underline nav-fill w-100 h-auto align-items-end">
        <li className="nav-item">
          <Link className="nav-link" href="#" to="/grocerylist">
            Grocery List
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#" to="/recipes">
            Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#" to="/profile">
            Profile
          </Link>
        </li>
        {localStorage.getItem("yalldis_user") ? (
          <li className="nav-item">
            <Link
              className="nav-link"
              href="#"
              to=""
              onClick={() => {
                localStorage.removeItem("yalldis_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
