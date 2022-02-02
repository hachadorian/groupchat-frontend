import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Message from "../components/Message";
import { GETCHANNEL_QUERY } from "../graphql/queries/getChannel";
import { CREATEMESSAGE_MUT } from "../graphql/mutations/createMessage";
import Loader from "../components/Loader";

const Channel = ({ channel, setMembers }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const result = useQuery(GETCHANNEL_QUERY, {
    variables: { id: channel.id },
  });

  useEffect(() => {
    if (result.data) {
      setMembers(result.data.getChannel.members);
      setMessages(result.data.getChannel.messages);
    }
  }, [result.data, setMembers]);

  const [createMessage] = useMutation(CREATEMESSAGE_MUT, {
    update: async (store, response) => {
      const dataInStore = await store.readQuery({
        query: GETCHANNEL_QUERY,
        variables: { id: channel.id },
      });
      store.writeQuery({
        query: GETCHANNEL_QUERY,
        data: {
          ...dataInStore,
          getChannel: {
            ...dataInStore.getChannel,
            messages: [
              ...dataInStore.getChannel.messages,
              response.data.createMessage,
            ],
          },
        },
      });
    },
  });

  const handleSubmit = async () => {
    if (message === "") return;
    const res = await createMessage({
      variables: { channelID: channel.id, message: message },
    });
    setMessages([...messages, res.data.createMessage]);
    setMessage("");
  };

  if (result.loading) return <Loader />;

  return (
    <div className="dark h-full relative">
      <div className="absolute top-0 w-full text-white font-bold shadow-bottom">
        <div className="px-14 py-4 dark">{channel.name}</div>
      </div>
      <div className="h-full flex flex-col overflow-auto py-16 px-14 text-white">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="px-14 py-4 w-full">
          <input
            className="w-11/12 p-3 rounded input-bg text-white w-full"
            placeholder="Type a message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
