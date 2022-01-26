import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Error from "../components/Error";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { CHANGEPASSWORD_MUT } from "../graphql/mutations/changePassword";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
    history.push("/");
  }

  const [changePassword] = useMutation(CHANGEPASSWORD_MUT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword.length === 0) {
      return setError("password cannot be empty");
    }
    const res = await changePassword({
      variables: { token: token, password: newPassword },
    });
    if (res.data.changePassword.__typename === "Errors") {
      return setError(res.data.changePassword.message);
    }
    setIsOpen(true);
    setError("");
  };

  return (
    <Wrapper header="Change Password">
      <form onSubmit={handleSubmit}>
        <InputField
          name="newpassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <Error message={error} />
        <Button text="Submit" />
      </form>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        headerText="Password Changed Successfully"
        text="Your password has been successfully changed."
      />
    </Wrapper>
  );
};

export default ChangePassword;
