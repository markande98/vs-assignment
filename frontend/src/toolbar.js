// toolbar.js

import {
  MdInput,
  MdOutput,
  MdOutlineTextSnippet,
  MdCallMade,
} from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { CgNotes } from "react-icons/cg";
import { DraggableNode } from "./draggableNode";
import { useState } from "react";

const draggableNodeData = [
  {
    type: "customInput",
    label: "Input",
    icon: MdInput,
  },
  {
    type: "llm",
    label: "AWS LLM",
    icon: MdCallMade,
  },
  {
    type: "customOutput",
    label: "Output",
    icon: MdOutput,
  },
  {
    type: "text",
    label: "Text",
    icon: MdOutlineTextSnippet,
  },
  {
    type: "note",
    label: "Note",
    icon: CgNotes,
  },
];

export const PipelineToolbar = () => {
  const [showToolBar, setShowToolBar] = useState(false);

  return (
    <>
      <div className="p-5 shadow-md space-y-4">
        {!showToolBar && (
          <div className="cursor-pointer w-fit p-2 rounded-full hover:bg-gray-50 transition-all duration-150">
            <FaPlusCircle
              onClick={() => setShowToolBar(true)}
              size={30}
              color="gray"
            />
          </div>
        )}
        {showToolBar && (
          <div className="flex items-center space-x-4">
            {draggableNodeData.map((data) => (
              <DraggableNode
                key={data.label}
                type={data.type}
                label={data.label}
                icon={data.icon}
              />
            ))}
          </div>
        )}
      </div>
      {showToolBar && (
        <div className="cursor-pointer mt-5 ms-6 w-fit p-2 rounded-full hover:bg-gray-50 transition-all duration-150">
          <RxCrossCircled
            color="gray"
            onClick={() => setShowToolBar(false)}
            size={30}
          />
        </div>
      )}
    </>
  );
};
