import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries/me";
import { UPDATE_MUT } from "../graphql/mutations/update";
import { IoIosArrowBack } from "react-icons/io";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Error from "../components/Error";

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const [update] = useMutation(UPDATE_MUT, {
    update: async (store, response) => {
      const dataInStore = await store.readQuery({ query: ME_QUERY });
      if (response.data.update.__typename !== "Errors") {
        store.writeQuery({
          query: ME_QUERY,
          data: {
            ...dataInStore,
            me: response.data.update,
          },
        });
      }
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = { image, name, bio, phone, email, password };
    const variables = {};
    Object.keys(inputs).forEach((input) => {
      if (inputs[input] !== "" && inputs[input] !== null) {
        variables[input] = inputs[input];
      }
    });
    const res = await update({ variables: variables });
    if (res.data.update.__typename === "Errors") {
      return setError(res.data.update.message);
    }
    setImage(null);
    setName("");
    setBio("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");
    history.push("/profile");
  };

  return (
    <div className="flex justify-center dark text-white">
      <div className="flex justify-center flex-col md:w-1/2">
        <button
          className="flex justify-start text-white md:ml-0 ml-10"
          onClick={() => history.goBack()}
        >
          <IoIosArrowBack size={18} className="mt-1" />
          Back
        </button>
        <div className="md:mt-5">
          <div className="py-12 px-12">
            <form
              className="flex justify-start flex-col"
              onSubmit={handleSubmit}
            >
              <div className="text-2xl">Change Info</div>
              <div className="secondary-font">
                Changes will be reflected to every services
              </div>
              <div className="py-2">
                <label>Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 secondary-font"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-blue-500 rounded-md font-medium text-white hover:bg-blue-600 p-1"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <InputField
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  placeholder="Enter your name..."
                />
              </div>
              <div className="py-2">
                <InputField
                  name="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  label="Bio"
                  placeholder="Enter your bio..."
                />
              </div>
              <div className="py-2">
                <InputField
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone"
                  placeholder="Enter your phone..."
                />
              </div>
              <div className="py-2">
                <InputField
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="py-2">
                <InputField
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Enter your password..."
                />
              </div>
              <div>
                <Error message={error} />
              </div>
              <div className="md:w-1/4">
                <Button text="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
