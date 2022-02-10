import { gql } from "@apollo/client";

export const GETSOMEMESSAGES_QUERY = gql`
  query GetSomeMessages($channelID: String!, $limit: Int, $offset: Int) {
    getSomeMessages(channelID: $channelID, limit: $limit, offset: $offset) {
      id
      user_id
      name
      image
      message
      created_at
      channel_id
    }
  }
`;
