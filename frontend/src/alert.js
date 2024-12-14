import { GrNodes } from "react-icons/gr";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GrCycle } from "react-icons/gr";

export const Alert = ({ nodes, edges, isDag }) => {
  console.log(nodes, edges, isDag);
  return (
    <div className="flex flex-col space-y-4 mt-5 justify-center">
      <div className="w-full flex items-center justify-between px-4">
        <h2 className=" w-1/3 text-lg font-mono font-semibold text-zinc-400">
          Nodes
        </h2>
        <GrNodes className="w-1/3" size={40} color="red" />
        <p className="w-1/3 text-xs px-4 py-2 bg-gray-100 rounded-md font-extrabold text-center">
          {nodes}
        </p>
      </div>
      <div className="w-full flex items-center justify-between px-4">
        <h2 className="w-1/3 text-lg font-mono font-semibold text-zinc-400">
          Edges
        </h2>
        <FaLongArrowAltRight size={40} color="green" className="w-1/3" />
        <p className="w-1/3 text-xs px-4 py-2 bg-gray-100 rounded-md font-extrabold text-center">
          {edges}
        </p>
      </div>
      <div className="w-full flex items-center justify-between px-4">
        <h2 className="w-1/3 text-lg font-mono font-semibold text-zinc-400">
          IsDag
        </h2>
        <GrCycle size={40} color="blue" className="w-1/3" />
        <p className="w-1/3 text-xs px-4 py-2 bg-gray-100 rounded-md font-extrabold text-center">
          {isDag ? "True" : "False"}
        </p>
      </div>
    </div>
  );
};
