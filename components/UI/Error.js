import { BiCheck } from "react-icons/bi";

export default function Error({ message }) {
  <div className="success container mx-auto">
    <div className="flex justify-center mx-auto border border-red-200 bg-red-400 w-3/6 text-white text-md my-4 py-2 text-center bg-opacity-5">
      {message}
      <span className="px-1">
        <BiCheck size={25} color={"rgb(248,113,113)"} />
      </span>
    </div>
  </div>;
}
