import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import Error from "./Error";

const AuthForm = ({
  handleSubmit,
  email,
  password,
  error,
  setEmail,
  setPassword,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <InputField
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Error message={error} />
      <Button text={buttonText} />
    </form>
  );
};

export default AuthForm;
