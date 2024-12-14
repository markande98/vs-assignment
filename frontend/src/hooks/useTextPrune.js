import { Position } from "reactflow";
import { extractOuterMostSpans, isSpanWithStyle, modify } from "../lib/helper";

const doubleCurlyBracesRegex = /\{\{.*?\}\}/;

export const useTextPrune = (text) => {
  let addHandleTextNodeData = [];
  let updatedText = [];
  if (!text.startsWith("<span")) text = `<span>${text}</span>`;
  const { outermostSpansString } = extractOuterMostSpans(text);
  updatedText = outermostSpansString;

  const resText = updatedText
    ?.map((txt) => {
      let res = [];
      txt = txt.replace(/\uFEFF/g, "");
      if (txt === "<span></span>" || txt === "<span><br></span>")
        return undefined;
      if (txt.startsWith("<span") && txt.endsWith("</span>")) {
        if (doubleCurlyBracesRegex.test(txt)) {
          const textInsideSpan = txt.slice(6, -7);
          const pos1 = textInsideSpan.indexOf("{{");
          const pos2 = textInsideSpan.indexOf("}}");
          const textBeforeCurlyBraces = textInsideSpan.slice(0, pos1);
          const textWithCurlyBraces = textInsideSpan.slice(pos1, pos2 + 2);
          const textAfterCurlyBraces = textInsideSpan.slice(pos2 + 2);

          res = [
            modify(textBeforeCurlyBraces, false),
            modify(textWithCurlyBraces.slice(2, -2), true),
            modify(textAfterCurlyBraces, false),
          ];

          return res.join("");
        }
        const { outermostSpans } = extractOuterMostSpans(txt);
        const node = outermostSpans[0]?.querySelector('[data-type="handle"]');
        if (node) {
          return modify(node.innerText, true);
        }
        return txt;
      }
      return txt;
    })
    .filter((t) => t !== undefined);

  let finalResText = [];

  let uniqueHandleData = new Set();

  resText.forEach((txt) => {
    const { outermostSpansString, handleTextNodeData } =
      extractOuterMostSpans(txt);
    outermostSpansString.forEach((t) => {
      finalResText.push(t);
    });
    handleTextNodeData.forEach((data) => {
      uniqueHandleData.add(data);
    });
  });
  const len = finalResText.length;

  if (len) {
    if (isSpanWithStyle(finalResText[0]))
      finalResText.unshift("<span>&#xFEFF;</span>");
    if (isSpanWithStyle(finalResText[finalResText.length - 1])) {
      finalResText.push("<span>&#xFEFF;</span>");
    }
  }
  uniqueHandleData.forEach((data) => {
    addHandleTextNodeData.push({
      type: "target",
      position: Position.Left,
      id: `${Math.random()}-input`,
      value: data,
    });
  });
  let updatedHandleTextNodeData = addHandleTextNodeData.map(
    (handle, index) => ({
      ...handle,
      style: {
        top: `${((index + 1) * 40) / 3}%`,
      },
    })
  );

  return {
    pruneText: finalResText.join(""),
    updatedHandleTextNodeData,
  };
};
