"use client";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Table from "./Table";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";


const Main = () => {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryclient = useQueryClient();
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryclient.prefetchQuery('users', getUsers);
      await dispatch(deleteAction(null))
    }
  };

  const cancelHandler = async () => {
    console.log("Cancel");
    await dispatch(deleteAction(null));
  };

  function confirmDelete({ deleteHandler, cancelHandler }) {
    return (
      <div className="flex gap-5">
        <button>Are you sure?</button>
        <button
          onClick={deleteHandler}
          className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
        >
          Yes{" "}
          <span className="px-1">
            <BiX color="rgb(255 255 255)" size={25} />
          </span>
        </button>
        <button
          onClick={cancelHandler}
          className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
        >
          No{" "}
          <span className="px-1">
            <BiCheck color="rgb(255 255 255)" size={25} />
          </span>
        </button>
      </div>
    );
  }

  const handleVisible = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <section>
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-blod py-10">
          Employee Management
        </h1>
        <div className="container mx-auto flex justify-between by-5 border-b">
          <div className="left flex gap-3">
            <button
              onClick={handleVisible}
              className="flex bg-indigo-500 text-white px-4 by-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800"
            >
              Add Employee{" "}
              <span className="px-2">
                <BiUserPlus size={25} />
              </span>
            </button>
          </div>
          {deleteId ? confirmDelete({ deleteHandler, cancelHandler }) : <></>}
          
        </div>

        {/* Collapsable form */}

        {visible ? <Form></Form> : <></>}

        <div className="container mx-auto ">
          <Table />
        </div>
      </main>
    </section>
  );
};

export default Main;
