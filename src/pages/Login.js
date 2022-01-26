import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/login";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ME_QUERY } from "../graphql/queries/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const [login] = useMutation(LOGIN_MUTATION, {
    update: async (store, response) => {
      const dataInStore = await store.readQuery({ query: ME_QUERY });
      store.writeQuery({
        query: ME_QUERY,
        data: {
          ...dataInStore,
          me:
            response.data.login.__typename === "User"
              ? response.data.login
              : null,
        },
      });
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await login({
      variables: { email: email, password: password },
    });
    if (res.data.login.__typename === "Errors") {
      setError(res.data.login.message);
      return;
    }
    setEmail("");
    setPassword("");
    setError("");
    history.push("/profile");
  };

  return (
    <div className="md:w-1/2 lg:w-1/4">
      <Wrapper
        header="Login"
        linkLabel="Don't have an account yet?"
        link="/register"
        linkText="Register"
      >
        <AuthForm
          handleSubmit={handleLogin}
          email={email}
          password={password}
          error={error}
          setEmail={setEmail}
          setPassword={setPassword}
          buttonText="Login"
        />
        <div className="text-center">
          <Link className="text-blue-500 hover:underline" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
