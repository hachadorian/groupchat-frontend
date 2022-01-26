import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { useMutation } from "@apollo/client";
import { REGISTER_MUT } from "../graphql/mutations/register";
import { useHistory } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const [register] = useMutation(REGISTER_MUT);

  const handleRegister = async (event) => {
    event.preventDefault();
    const res = await register({
      variables: { email: email, password: password },
    });
    if (res.data.register.__typename === "Errors") {
      return setError(res.data.register.message);
    }
    setEmail("");
    setPassword("");
    setError("");
    history.push("/profile");
  };

  return (
    <div className="md:w-1/2 lg:w-1/4">
      <Wrapper
        header="Join thousands of learners from around the world"
        subtext="Master web development by making real-life projects. There are multiple paths for you to choose."
        linkLabel="Already a member?"
        link="/"
        linkText="Login"
      >
        <AuthForm
          handleSubmit={handleRegister}
          email={email}
          password={password}
          error={error}
          setEmail={setEmail}
          setPassword={setPassword}
          buttonText="Start coding now"
        />
      </Wrapper>
    </div>
  );
};

export default Register;
