import { useState } from "react";
import { Position } from "reactflow";
import { NodeWrapper } from "../components/nodeWrapper";
import { MdInput } from "react-icons/md";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleInputNodeData = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      value: "input_1",
    },
  ];

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <NodeWrapper
      title="input"
      handleNodeData={handleInputNodeData}
      icon={MdInput}
    >
      <div className="space-y-4">
        <div className="flex flex-col space-y-1 text-gray-500">
          <label className="text-xs">Field Name</label>
          <input
            className="text-xs group-hover:text-blue-400 transition-colors duration-150 font-semibold focus:outline-none focus:ring-0"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col space-y-2 text-gray-500">
          <label className="text-xs">Type</label>
          <select
            className="text-xs group-hover:text-blue-400 transition-colors duration-150 font-semibold focus:outline-none focus:ring-0"
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </NodeWrapper>
  );
};
