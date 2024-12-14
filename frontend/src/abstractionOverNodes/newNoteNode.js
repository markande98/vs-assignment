import { NodeWrapper } from "../components/nodeWrapper";
import { Position } from "reactflow";
import { CgNotes } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";

export const NoteNode = ({ id }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const handleNoteNodeData = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
    },
  ];

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <NodeWrapper
      title="Note"
      handleNodeData={handleNoteNodeData}
      icon={CgNotes}
    >
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        value={text}
        className="border border-zinc-300 bg-yellow-100"
        rows={3}
      />
    </NodeWrapper>
  );
};
