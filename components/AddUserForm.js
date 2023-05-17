import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Bug from "./Bug";
import Success from "./Success";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";




const AddUserForm = ({formData, setFormData}) => {
    const queryClient = useQueryClient()
  
  const addMutation = useMutation(addUser, {
    onSuccess : () => {
        queryClient.prefetchQuery('users', getUsers)
    }
})

const handleSubmit = (e) => {
  e.preventDefault();
  if(Object.keys(formData).length == 0) return console.log("Don't have Form Data");
  let { firstname, lastname, email, avatar, salary, date, status } = formData;

  const model = {
      name : `${firstname} ${lastname}`,
      email, avatar, salary, date, status : status ?? "Active"
  }

  addMutation.mutate(model)
}

  //if(Object.keys(formData).length > 0) return <Success message={"Success To Add Data"}/>
  //if(Object.keys(formData).length > 0) return <Bug message={"Error"}/>
  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Bug message={addMutation.error.message}></Bug>;
  if (addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>;

  return (
    <form className="grid lg:grid-cols-2 w4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          placeholder="FirstName"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lastname"
          placeholder="LastName"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          placeholder="Email"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="avatar"
          placeholder="Url Image"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          placeholder="Salary"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      
      <div className="flex gap-60 items-center">
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          placeholder="Date"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            defaultChecked={status == "Active"}
            onChange={setFormData}
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            defaultChecked={status !== "Active"}
            onChange={setFormData}
            value="InActive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            InActive
          </label>
        </div>
      </div>

      </div>
      <div>
        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          Add{" "}
          <span className="px-1">
            <BiPlus size={22} />
          </span>
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;