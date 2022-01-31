import { gql } from "@apollo/client";

export const ADDMEMBER_MUT = gql`
  mutation AddMember($channelID: String!) {
    addMember(channelID: $channelID)
  }
`;
