import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BiBrush } from "react-icons/bi";
import { getUser, getUsers, updateUser } from "../lib/helpers";
import Error from "./UI/Error";
import Success from "./UI/Success";

export default function UpdateUserForm({ formId, formData, setFormData }) {

  const queryclient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );

  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      console.log("update successfull");
      // queryclient.setQueryData(['users'], (old)=> [data]  )
      queryclient.prefetchQuery(["users"], getUsers)
    },
    onError: () => {
      console.log("update failed");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Error message={error.message} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userName = `${formData.firtsname ?? firtsname} ${
      formData.lastsname ?? lastsname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });

    await UpdateMutation.mutate(updated);
  };

  const { name, avatar, salary, date, email, status } = data;
  const [firtsname, lastsname] = name ? name.split(" ") : formData;
  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          onChange={setFormData}
          defaultValue={firtsname}
          type="text"
          name="firtsname"
          placeholder="FirstName"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          defaultValue={lastsname}
          type="text"
          name="lastsname"
          placeholder="LastName"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          defaultValue={email}
          type="text"
          name="email"
          placeholder="Email"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          defaultValue={salary}
          type="text"
          name="salary"
          placeholder="Salary"
          className="border w-full py-5 px-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          defaultValue={date}
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
            defaultChecked={status == "active"}
            type="radio"
            value="Active"
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
            defaultChecked={status !== "active"}
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
      <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
        Update
        <span className="px-1">
          <BiBrush size={23} />
        </span>
      </button>
    </form>
  );
}
