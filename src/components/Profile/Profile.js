import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Profile.css";

export const Profile = ({ currentUser }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const navigate = useNavigate();

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const editedCurrentUser = {
      name: currentUserInfo.name,
      email: currentUserInfo.email,
      isAdministrator: currentUserInfo.isAdministrator,
      id: currentUserInfo.id,
    };

    updateUser(editedCurrentUser).then(() => {
      window.alert("Profile Updated!");
      navigate("/login");
    });
  };

  useEffect(() => {
    getUserById(currentUser.id).then((user) => {
      setCurrentUserInfo(user);
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="signika-font-bold profile-h1">Profile</h1>
      </div>
      <div className="profile-body">
        <section>
          <div className="profile-item">
            <h4 className="profile-title">Name:</h4>
            <fieldset>
              <input
                type="text"
                required
                value={currentUserInfo.name}
                onChange={(event) => {
                  const copy = { ...currentUserInfo };
                  copy.name = event.target.value;
                  setCurrentUserInfo(copy);
                }}
              />
            </fieldset>
          </div>
          <div className="profile-item">
            <h4 className="profile-title">Email: </h4>
            <fieldset>
              <input
                type="text"
                required
                value={currentUserInfo.email}
                onChange={(event) => {
                  const copy = { ...currentUserInfo };
                  copy.email = event.target.value;
                  setCurrentUserInfo(copy);
                }}
              />
            </fieldset>
          </div>
          <div className="profile-item">
            <fieldset>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    id="isAdministrator"
                    checked={currentUserInfo.isAdministrator}
                    onChange={(event) => {
                      const copy = { ...currentUserInfo };
                      copy.isAdministrator = event.target.checked;
                      setCurrentUserInfo(copy);
                    }}
                  />
                  I am an administrator
                </label>
              </div>
            </fieldset>
          </div>
        </section>
        <section className="profile-item btn-update-profile">
          <Button
            variant="dark"
            className="btn-update"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </section>
      </div>
    </div>
  );
};
