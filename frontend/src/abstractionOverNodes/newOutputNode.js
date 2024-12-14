// outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeWrapper } from "../components/nodeWrapper";
import { MdOutput } from "react-icons/md";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");
  const handleOutputNodeData = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
      value: "output_1",
    },
  ];

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <NodeWrapper
      title="Output"
      handleNodeData={handleOutputNodeData}
      icon={MdOutput}
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
            value={outputType}
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
