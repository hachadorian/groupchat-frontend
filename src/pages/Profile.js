import React from "react";
import { useHistory } from "react-router";
import ProfileField from "../components/ProfileField";

const Profile = ({ profile }) => {
  const history = useHistory();
  return (
    <div>
      <div className="flex justify-center pb-24">
        <div className="flex justify-center flex-col md:w-1/2">
          <div className="text-center py-12">
            <div className="text-3xl py-2">Personal info</div>
            <div className="text-gray-500">
              Basic info, like your name and photo
            </div>
          </div>
          <div className="md:border rounded-xl divide-y">
            <div className="grid grid-cols-2 py-12 px-12">
              <div className="flex justify-start flex-col">
                <div className="text-2xl">Profile</div>
                <div className="text-gray-500">
                  Some info may be visible to other people
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  className="border rounded-xl h-1/2 md:h-full px-5 md:px-10 text-gray-500 hover:bg-gray-300"
                  onClick={() => history.push("/editprofile")}
                >
                  Edit
                </button>
              </div>
            </div>
            {Object.keys(profile).map((key) => (
              <ProfileField key={key} label={key} value={profile[key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
