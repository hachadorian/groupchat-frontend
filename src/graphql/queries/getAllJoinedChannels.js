import { gql } from "@apollo/client";

export const GETALLJOINEDCHANNELS_QUERY = gql`
  query {
    getAllJoinedChannels {
      id
      name
      description
    }
  }
`;
