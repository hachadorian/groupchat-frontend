import { useMutation } from "@apollo/client";
import React from "react";
import { ADDMEMBER_MUT } from "../graphql/mutations/addMember";
import { GETALLJOINEDCHANNELS_QUERY } from "../graphql/queries/getAllJoinedChannels";

const ChannelCard = ({ channel }) => {
  const borderStyle = {
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };

  const [addMember] = useMutation(ADDMEMBER_MUT, {
    update: async (store, response) => {
      const joinedChannels = await store.readQuery({
        query: GETALLJOINEDCHANNELS_QUERY,
        variables: { channelID: channel.id },
      });
      store.writeQuery({
        query: GETALLJOINEDCHANNELS_QUERY,
        data: {
          ...joinedChannels,
          getAllJoinedChannels: [
            ...joinedChannels.getAllJoinedChannels,
            channel,
          ],
        },
      });

      store.modify({
        id: store.identify(channel),
        fields: {
          is_member(cachedVal) {
            return !cachedVal;
          },
          member_count(cachedVal) {
            return cachedVal + 1;
          },
        },
      });
    },
  });

  const handleSubmit = async () => {
    const res = await addMember({
      variables: { channelID: channel.id },
    });
    if (!res.data.addMember) {
      console.log(res.data.addMember);
      return;
    }
  };

  return (
    <div className="darker text-white flex flex-col items-center rounded-lg p-12 text-center">
      <div className="font-bold">{channel.name}</div>
      <div
        className="flex items-center justify-center text-3xl rounded-full border-4 w-24 h-24 mx-4 my-2 dark"
        style={borderStyle}
      >
        {/* first letter of channel name */}
        {channel.name.split(" ")[0][0]}
      </div>
      <div className="my-2">
        <div>
          {channel.member_count}{" "}
          {channel.member_count === 1 ? "member" : "members"}
        </div>
      </div>
      <div className="w-full my-2">
        {channel.is_member ? (
          <button
            className="text-green-500 border-2 border-green-500 p-2 w-full rounded disabled cursor-not-allowed"
            disabled={true}
          >
            Joined ✓
          </button>
        ) : (
          <button
            className="bg-blue-500 p-2 w-full rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Join
          </button>
        )}
      </div>
      <div className="secondary-font my-2">{channel.description}</div>
    </div>
  );
};

export default ChannelCard;
