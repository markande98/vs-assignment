// llmNode.js

import ContentEditable from "react-contenteditable";
import { Position } from "reactflow";
import { NodeWrapper } from "../components/nodeWrapper";
import { MdCallMade } from "react-icons/md";
import { useRef, useState } from "react";

export const LLMNode = ({ id, data }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const inputRef = useRef(null);
  const handleLlmNodedata = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      value: "response",
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      value: "prompt",
    },
  ];

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);
  const handleChange = (e) => setText(e.target.value);
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <NodeWrapper
      title="AWS LLM"
      handleNodeData={handleLlmNodedata}
      icon={MdCallMade}
    >
      <div className="flex flex-col space-y-2">
        <div>
          <label className="text-xs">Prompt</label>
          <ContentEditable
            ref={inputRef}
            html={text}
            contentEditable={true}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`
            border
            p-2 
            w-[200px]
            rounded-md
            transition-all 
            duration-300 
            text-xs
            ${
              isFocused
                ? "border-blue-500 outline-none shadow-md"
                : "border-gray-300 hover:border-gray-400"
            }
            focus:outline-none
            cursor-text
            `}
          />
        </div>
        <div className="flex flex-col space-y-2 text-gray-500">
          <label className="text-xs">Model</label>
          <select
            className="text-xs group-hover:text-blue-400 transition-colors duration-150 font-semibold focus:outline-none focus:ring-0"
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="Text">titan-text-express</option>
            <option value="File">tital-text-lite</option>
          </select>
        </div>
      </div>
    </NodeWrapper>
  );
};
