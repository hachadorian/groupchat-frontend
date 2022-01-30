import { useMutation } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdPeople, MdOutlineExitToApp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory } from "react-router";
import { LOGOUT_MUT } from "../graphql/mutations/logout";
import { ME_QUERY } from "../graphql/queries/me";
import { Link } from "react-router-dom";

const Dropdown = ({ name }) => {
  const history = useHistory();

  const [logout] = useMutation(LOGOUT_MUT, {
    update: async (store, response) => {
      const dataInStore = await store.readQuery({ query: ME_QUERY });
      store.writeQuery({
        query: ME_QUERY,
        data: {
          ...dataInStore,
          me: null,
        },
      });
    },
  });

  const handleLogout = async () => {
    const res = await logout();
    if (res.data.logout) {
      history.push("/");
    }
  };

  return (
    <Menu as="div">
      <div>
        <span className="font-bold mr-2">{name}</span>
        <Menu.Button className="px-4 py-2 text-sm">
          {({ open }) => (
            <IoIosArrowDown className={`transform ${open && " rotate-180"}`} />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-6 w-56 m-2 -mt-64 origin-top-right rounded-lg ring-1 ring-black ring-opacity-5 p-2 focus:outline-none dark">
          <div className="px-2 py-2  border-b-2 border-gray-600">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active && "secondary"
                  } group flex rounded-md items-center w-full py-3 text-sm`}
                >
                  <IoPersonCircleSharp className="mx-3" size={24} />
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/home"
                  className={`${
                    active && "secondary"
                  } group flex rounded-md items-center w-full py-3 text-sm`}
                >
                  <MdPeople className="mx-3" size={24} />
                  Group Chat
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-2 py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "secondary"
                  } group flex rounded-md items-center w-full py-3 text-sm text-red-500`}
                  onClick={handleLogout}
                >
                  <MdOutlineExitToApp className="mx-3" size={24} />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
