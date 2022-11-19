import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./UI/Success";
import Error from "./UI/Error";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers, postUser } from "../lib/helpers";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function AddUserForm() {

  const queryClient =  useQueryClient()
  const [formData, setFormData] = useReducer(formReducer, {});
  const addMutation = useMutation(postUser, {
    onSuccess: () => {
      queryClient.prefetchQuery('users', getUsers)
      console.log("data inserted");
    },
    onError: () => {
      console.log("error... data no inserted");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(formData).length == 0) return console.log("esta en vlanco");

    let { firtsname, lastsname, email, salary, date, status } = formData;
    const model = {
      name: `${firtsname} ${lastsname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? "active",
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Error message={addMutation.error.message} />;
  if(addMutation.isSuccess) return <Success message="Added Successful" />
  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="firtsname"
          placeholder="FirstName"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="lastsname"
          placeholder="LastName"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="email"
          placeholder="Email"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="salary"
          placeholder="Salary"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="date"
          name="date"
          placeholder="Date"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center ">
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            value="active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transiion duration-200 mt-1 aling-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            value="inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transiion duration-200 mt-1 aling-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label
            htmlFor="radioDefault2"
            className="inline-block text-gray-800 "
          >
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add
        <span className="px-1">
          <BiPlus size={23} />
        </span>
      </button>
    </form>
  );
}
