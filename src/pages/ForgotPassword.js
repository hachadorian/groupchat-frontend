import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Button from "../components/Button";
import Error from "../components/Error";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { FORGOTPASSWORD_MUT } from "../graphql/mutations/forgotPassword";
import Modal from "../components/Modal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const [forgotPassword] = useMutation(FORGOTPASSWORD_MUT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await forgotPassword({
      variables: { email: email },
    });
    if (res) {
      setIsOpen(true);
      setError("");
    }
  };

  return (
    <Wrapper header="Forgot Password">
      <form onSubmit={handleSubmit}>
        <InputField
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Error message={error} />
        <Button text="Submit" />
      </form>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        headerText="Email Sent"
        text="An email to reset your password has been sent."
      />
    </Wrapper>
  );
};

export default ForgotPassword;
