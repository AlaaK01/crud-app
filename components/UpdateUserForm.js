import { BiBrush } from "react-icons/bi";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser, getUsers, PutUser } from "../lib/helper";

const UpdateUserForm = ({ formId, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );
  const UpdateMutation = useMutation((newData) => PutUser(formId, newData), {
    onSuccess: async (data) => {
       queryClient.setQueryData('users', (old) => [data])
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(" ") : formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });
    console.log(updated);
    UpdateMutation.mutate(updated);
  };

  return (
    <form className="grid lg:grid-cols-2 w4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={firstname}
          name="firstname"
          placeholder="FirstName"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={lastname}
          name="lastname"
          placeholder="LastName"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={email}
          name="email"
          placeholder="Email"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={avatar}
          name="avatar"
          placeholder="Url Image"
          className="border w-full px-5 py-3 focus.outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={salary}
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
          defaultValue={date}
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
        <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          Update{" "}
          <span className="px-1">
            <BiBrush size={22} />
          </span>
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
