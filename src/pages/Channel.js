import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Message from "../components/Message";
import { GETCHANNEL_QUERY } from "../graphql/queries/getChannel";
import { CREATEMESSAGE_MUT } from "../graphql/mutations/createMessage";
import Loader from "../components/Loader";
import { useSubscription } from "@apollo/client";
import { MESSAGE_ADDED } from "../graphql/subcriptions/messageAdded";
import { useApolloClient } from "@apollo/client";
import UserContext from "../utils/UserContext";
import { socket } from "../utils/socket";
import { GETSOMEMESSAGES_QUERY } from "../graphql/queries/getSomeMessages";

const Channel = ({ channel, setMembers }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [pageSocket, setPageSocket] = useState(null);
  const getChannel = useQuery(GETCHANNEL_QUERY, {
    variables: { id: channel.id },
  });
  const { loading, data, fetchMore } = useQuery(GETSOMEMESSAGES_QUERY, {
    fetchPolicy: "network-only",
    variables: { channelID: channel.id, limit: 8, offset: 0 },
  });
  const { cache } = useApolloClient();
  const user = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (getChannel.data) {
      setMembers(getChannel.data.getChannel.members);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChannel.data]);

  useEffect(() => {
    if (data) {
      setMessages(data.getSomeMessages);
    }
    setPageSocket(socket.emit("join", channel.id));
    setTyping("");
  }, [channel, data]);

  useEffect(() => {
    if (!pageSocket) return;
    pageSocket.on("someoneTyping", (data) => {
      if (channel.id !== data.roomId) {
        setTyping("");
        return pageSocket.emit("leave", { roomId: data.roomId });
      }
      setTyping(data.user);
    });
    pageSocket.on("nooneTyping", (data) => {
      setTyping("");
    });
  });

  useEffect(() => {
    if (!pageSocket) return;
    const timer = setTimeout(() => {
      pageSocket.emit("not-typing", { roomId: channel.id });
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const [createMessage] = useMutation(CREATEMESSAGE_MUT);

  const handleSubmit = async () => {
    if (message === "") return;
    const res = await createMessage({
      variables: { channelID: channel.id, message: message },
    });
    setMessages([...messages, res.data.createMessage]);
    setMessage("");
  };

  useSubscription(MESSAGE_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      const { messageAdded } = subscriptionData.data;
      updateCacheWith(messageAdded.channel_id, messageAdded);
    },
  });

  const updateCacheWith = async (channelId, messageAdded) => {
    const includedIn = (set, object) =>
      set.map((m) => m.id).includes(object.id);

    const dataInStore = cache.readQuery({
      query: GETSOMEMESSAGES_QUERY,
      variables: {
        channelID: channelId,
      },
    });

    if (!includedIn(dataInStore.getSomeMessages, messageAdded)) {
      cache.writeQuery({
        query: GETSOMEMESSAGES_QUERY,
        data: [...dataInStore.getSomeMessages, messageAdded],
      });
    }
  };

  if (getChannel.loading || loading) return <Loader />;

  return (
    <div className="dark h-full relative">
      <div className="absolute top-0 w-full text-white font-bold shadow-bottom">
        <div className="px-14 py-4 dark">{channel.name}</div>
      </div>
      <div className="h-full flex flex-col flex-col-reverse overflow-auto pb-20 pt-16 px-8 md:px-14 text-white">
        {[...messages].reverse().map((message) => {
          return <Message key={message.id} message={message} />;
        })}
        {messages.length >= 8 && hasMore && (
          <div className="w-full text-center">
            <button
              className="secondary-font text-sm cursor-pointer"
              onClick={async (e) => {
                const res = await fetchMore({
                  variables: { offset: data.getSomeMessages.length },
                });
                if (res.data.getSomeMessages.length < 8) {
                  setHasMore(false);
                }
                setMessages([...messages, ...res.data.getSomeMessages]);
              }}
            >
              load more...
            </button>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="px-8 md:px-14 py-4 w-full">
          {typing && (
            <div className="text-white italic animate-pulse py-2">
              {typing} is typing...
            </div>
          )}
          <input
            className="w-11/12 p-3 rounded input-bg text-white w-full"
            placeholder="Type a message here"
            value={message}
            onChange={(e) => {
              pageSocket.emit("typing", {
                user: user.name,
                roomId: channel.id,
              });
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 -ml-10 h-8 w-8 text-white rounded pl-2"
            onClick={handleSubmit}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
