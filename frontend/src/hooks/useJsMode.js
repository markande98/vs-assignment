import { useEffect, useState } from "react";

export const useJsMode = (text) => {
  const [isJsModeActive, setIsJsModeActive] = useState(false);

  const getCurrentSpan = () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);

    let currentNode = range.commonAncestorContainer;

    while (currentNode && currentNode !== document.body) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        if (currentNode.dataset.myAttribute === "code-zone") {
          return currentNode;
        }
      }
      currentNode = currentNode.parentNode;
    }
    return null;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      let node;
      switch (key) {
        case "arrowleft":
          node = getCurrentSpan();
          break;
        case "arrowright":
          node = getCurrentSpan();
          break;
        case "arrowup":
          node = getCurrentSpan();
          break;
        case "arrowdown":
          node = getCurrentSpan();
          break;
        default:
          break;
      }
      if (node) setIsJsModeActive(true);
      else setIsJsModeActive(false);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [text]);

  return isJsModeActive;
};
