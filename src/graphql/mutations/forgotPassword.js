import { gql } from "@apollo/client";

export const FORGOTPASSWORD_MUT = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
