import { gql } from "@apollo/client";

export const GETCHANNEL_QUERY = gql`
  query GetChannel($id: String!) {
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
      messages {
        id
        user_id
        name
        image
        message
        created_at
      }
    }
  }
`;
