import React from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries/user";
import PrivateWrapper from "./PrivateWrapper";

const HomeWrapper = () => {
  const result = useQuery(ME_QUERY);

  if (result.loading) {
    return <div></div>;
  } else {
    return (
      <div>
        <PrivateWrapper profile={result.data} />
      </div>
    );
  }
};

export default HomeWrapper;
