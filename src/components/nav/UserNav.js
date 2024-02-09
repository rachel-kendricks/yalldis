import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Button from "react-bootstrap/Button";

export const UserNav = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="nav-item">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/Y’alldis_logo.png"}
            alt="yalldis logo"
            className="img-logo"
          />
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/grocerylist">Grocery List</Link>
      </li>
      <li>
        <Button>My Button</Button>
      </li>
      <li className="navbar-item">
        <Link to="/recipes">Recipes</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      {localStorage.getItem("yalldis_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
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
  );
};
