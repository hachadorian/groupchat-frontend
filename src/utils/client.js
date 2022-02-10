import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const link = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_URL,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  link
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Message: {
        keyFields: ["channel_id", "id"],
      },
      Query: {
        fields: {
          getSomeMessages: {
            read(
              existing,
              { args: { offset = 0, limit = existing?.length } = {} }
            ) {
              return existing && existing.slice(offset, offset + limit);
            },
            keyArgs: false,
            merge(existing, incoming, { args: { offset = 0 } }) {
              if (
                existing &&
                existing[0].__ref.split(":")[2] !==
                  incoming[0].__ref.split(":")[2]
              ) {
                return incoming;
              }
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
  link: splitLink,
});

export default client;
