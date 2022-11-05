import { BiEdit, BiTrashAlt } from "react-icons/bi";
export default function EmployeeRow({
  name,
  email,
  avatar,
  salary,
  date,
  status,
}) {
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img src={avatar} alt="" />
        <span className="text-center ml-2 font-semibold">{name}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email}</span>
      </td>
      <td className="px-16 py-2">
        <span>${salary}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span className="bg-green-500 text-white px-5 py-1 rounded-full">
            {status}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor">
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor">
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
