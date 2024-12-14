import { Handle, Position } from "reactflow";

export const NodeWrapper = ({
  children,
  handleNodeData,
  title,
  icon: Icon,
}) => {
  return (
    <div className="w-fit h-fit ring hover:ring-4 hover:ring-offset-blue-300 group rounded-md p-2 space-y-4 transition duration-300">
      <div className="flex items-center space-x-2 text-gray-500">
        <Icon
          className="group-hover:text-blue-400 transition-colors duration-150"
          size={20}
        />
        <span className="group-hover:text-blue-400 transition-colors duration-150 font-semibold">
          {title}
        </span>
      </div>
      {children}
      {handleNodeData.map((data) => (
        <Handle
          key={data.id}
          type={data.type}
          position={data.position}
          id={data.id}
          style={data.style}
          className={`!w-4 !h-4 flex items-center !p-1 !bg-white !border-1 !border-gray-400 ${
            data.position === Position.Left ? "!-left-[10px]" : "!-right-[10px]"
          }`}
        >
          <span
            className={`absolute text-xs text-zinc-600 font-fono ${
              data.position === Position.Left
                ? "!-left-[60px]"
                : "!-right-[60px]"
            }`}
          >
            {data.value}
          </span>
        </Handle>
      ))}
    </div>
  );
};
