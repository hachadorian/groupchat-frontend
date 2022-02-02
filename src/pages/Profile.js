import React, { useContext } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";
import ProfileField from "../components/ProfileField";
import UserContext from "../utils/UserContext";

const Profile = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  return (
    <div>
      <div className="flex justify-center pb-24 dark text-white">
        <div className="flex justify-center flex-col md:w-1/2">
          <div className="text-center py-12">
            <div className="text-3xl py-2">Personal info</div>
            <div className="secondary-font">
              Basic info, like your name and photo
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 py-12 px-12">
              <div className="flex justify-start flex-col">
                <div className="text-2xl">Profile</div>
                <div className="secondary-font">
                  Some info may be visible to other people
                </div>
              </div>
              <div className="flex w-1/2 ml-auto">
                <Button
                  onClick={() => history.push("/editprofile")}
                  text="Edit"
                />
              </div>
            </div>
            {Object.keys(user).map((key) => (
              <ProfileField key={key} label={key} value={user[key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
