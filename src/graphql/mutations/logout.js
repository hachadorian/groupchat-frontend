import { gql } from "@apollo/client";

export const LOGOUT_MUT = gql`
  mutation Logout {
    logout
  }
`;
