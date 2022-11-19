import EmployeeRow from "./EmployeeRow";
import { getUsers } from "../lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Table() {
  const state = useSelector((state) => state);
  const { isLoading, isError, data, error } = useQuery(["users"], getUsers);
console.log(state);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error, {error}</p>;
  console.log("data", data);
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((item) => (
          <EmployeeRow key={item._id} {...item} />
        ))}
      </tbody>
    </table>
  );
}
