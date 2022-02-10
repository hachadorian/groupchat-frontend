import { gql } from "@apollo/client";

export const GETCHANNEL_QUERY = gql`
  query GetChanel($id: String!) {
    getChannel(id: $id) {
      id
      name
      description
      members {
        user_id
        name
        is_creator
        image
      }
    }
  }
`;
