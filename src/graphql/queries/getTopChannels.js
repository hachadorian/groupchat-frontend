import { gql } from "@apollo/client";

export const GETTOPCHANNELS_QUERY = gql`
  query {
    getTopChannels {
      id
      name
      description
      is_member
      member_count
    }
  }
`;
