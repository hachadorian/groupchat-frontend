import { gql } from "@apollo/client";

export const GETALLCHANNELS_QUERY = gql`
  query {
    getAllChannels {
      id
      name
      description
    }
  }
`;
