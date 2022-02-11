import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { CREATECHANNEL_MUT } from "../graphql/mutations/createChannel";
import { GETCHANNELS_QUERY } from "../graphql/queries/getChannels";
import { GETALLJOINEDCHANNELS_QUERY } from "../graphql/queries/getAllJoinedChannels";
import Error from "./Error";

const Modal = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const [createChannel] = useMutation(CREATECHANNEL_MUT, {
    update: async (store, response) => {
      if (response.data.createChannel.__typename === "Errors") return;

      const channels = await store.readQuery({
        query: GETCHANNELS_QUERY,
        variables: { search: "" },
      });
      if (channels) {
        store.writeQuery({
          query: GETCHANNELS_QUERY,
          data: {
            ...channels,
            getChannels: [...channels.getChannels, response.data.createChannel],
          },
        });
      }

      const joinedChannels = await store.readQuery({
        query: GETALLJOINEDCHANNELS_QUERY,
      });
      store.writeQuery({
        query: GETALLJOINEDCHANNELS_QUERY,
        data: {
          ...joinedChannels,
          getAllJoinedChannels: [
            ...joinedChannels.getAllJoinedChannels,
            response.data.createChannel,
          ],
        },
      });
    },
  });

  const handleSubmit = async () => {
    const res = await createChannel({
      variables: { name: name, description: description },
    });
    if (res.data.createChannel.__typename === "Errors") {
      setError(res.data.createChannel.message);
      return;
    }
    setName("");
    setDescription("");
    setIsOpen(false);
    history.push("/home");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto rubik"
          onClose={(e) => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform darker shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  NEW CHANNEL
                </Dialog.Title>

                <div className="mt-2 modal-font">
                  <div className="py-2 text-white">
                    <input
                      className="w-full p-2 rounded input-bg"
                      placeholder="Channel name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="py-2 text-white">
                    <textarea
                      className="p-2 input-bg w-full rounded"
                      placeholder="Channel Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                {error && <Error message={error} />}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
