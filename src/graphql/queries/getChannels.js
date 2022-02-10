import { gql } from "@apollo/client";

export const GETCHANNELS_QUERY = gql`
  query GetChannels($search: String!) {
    getChannels(search: $search) {
      id
      name
      description
      member_count
      is_member
    }
  }
`;
