// textNode.js

import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { PiBracketsCurly } from "react-icons/pi";
import { MdCodeOff } from "react-icons/md";
import { MdOutlineTextSnippet } from "react-icons/md";
import { Position } from "reactflow";
import { NodeWrapper } from "../components/nodeWrapper";
import { useTextPrune } from "../hooks/useTextPrune";
import { useJsMode } from "../hooks/useJsMode";

export const TextNode = ({ id, data }) => {
  const initialhandleTextNodeData = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      value: "output",
    },
  ];
  const [currText, setCurrText] = useState(data?.text || `{{input}}`);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(null);
  const inputRef = useRef(null);
  const { pruneText, updatedHandleTextNodeData } = useTextPrune(currText);
  const isJsModeActive = useJsMode(pruneText);

  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(inputRef.current);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString().length;
  };

  const setCaretPositionInContent = (position) => {
    const selection = window.getSelection();
    const range = document.createRange();
    const element = inputRef.current;

    let charIndex = 0;
    const findNode = (nodes) => {
      for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const nextCharIndex = charIndex + node.textContent.length;
          if (position >= charIndex && position <= nextCharIndex) {
            range.setStart(node, position - charIndex);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            return true;
          }
          charIndex = nextCharIndex;
        } else {
          if (findNode(node.childNodes)) return true;
        }
      }
      return false;
    };

    findNode(element.childNodes);
  };

  const handleChange = (e) => {
    setCurrText(e.target.value);
    setCaretPosition(getCaretPosition());
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (caretPosition !== null) {
      setCaretPositionInContent(caretPosition);
    }
  }, [currText, caretPosition]);

  return (
    <NodeWrapper
      title="Text"
      handleNodeData={[
        ...updatedHandleTextNodeData,
        ...initialhandleTextNodeData,
      ]}
      icon={MdOutlineTextSnippet}
    >
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs">Text</label>
          {isJsModeActive && <MdCodeOff size={13} className="text-gray-600" />}
          {!isJsModeActive && (
            <PiBracketsCurly size={13} className="text-gray-600" />
          )}
        </div>
        <ContentEditable
          innerRef={inputRef}
          contentEditable
          onBlur={handleBlur}
          html={pruneText}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`
          border
          p-2 
          w-[200px]
          rounded-md
          transition-all 
          duration-300 
          flex
          items-center
          flex-wrap
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
    </NodeWrapper>
  );
};
