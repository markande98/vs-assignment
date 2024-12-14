export const modify = (txt, isStyle) => {
  if (isStyle) {
    let updatedText = "";
    if (!txt) updatedText = "&#xFEFF;";
    else updatedText = txt.replace(/\uFEFF/g, "");
    return `<span data-my-attribute="code-zone" class="border mx-1 inline-flex p-1 rounded-md text-blue-700 font-medium items-center bg-white justify-center">
        <span class="flex items-center justify-center">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="mr-[4px] text-[14px] text-blue-600 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M39.91,128a27.68,27.68,0,0,1,9.49,11.13C54,148.62,54,160.51,54,172c0,24.27,1.21,38,26,38a6,6,0,0,1,0,12c-16.88,0-27.81-5.6-33.4-17.13C42,195.38,42,183.49,42,172c0-24.27-1.21-38-26-38a6,6,0,0,1,0-12c24.79,0,26-13.73,26-38,0-11.49,0-23.38,4.6-32.87C52.19,39.6,63.12,34,80,34a6,6,0,0,1,0,12C55.21,46,54,59.73,54,84c0,11.49,0,23.38-4.6,32.87A27.68,27.68,0,0,1,39.91,128ZM240,122c-24.79,0-26-13.73-26-38,0-11.49,0-23.38-4.6-32.87C203.81,39.6,192.88,34,176,34a6,6,0,0,0,0,12c24.79,0,26,13.73,26,38,0,11.49,0,23.38,4.6,32.87A27.68,27.68,0,0,0,216.09,128a27.68,27.68,0,0,0-9.49,11.13C202,148.62,202,160.51,202,172c0,24.27-1.21,38-26,38a6,6,0,0,0,0,12c16.88,0,27.81-5.6,33.4-17.13,4.6-9.49,4.6-21.38,4.6-32.87,0-24.27,1.21-38,26-38a6,6,0,0,0,0-12Z"></path></svg>
        <span contenteditable="false">&nbsp;</span>
        <span data-type="handle">${updatedText}</span>
        </span>
        </span>`;
  }
  if (!txt) return undefined;
  return `<span>${txt}</span>`;
};

export const extractOuterMostSpans = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const outermostSpansString = [];
  const outermostSpans = [];

  let handleTextNodeData = [];

  doc.querySelectorAll("span").forEach((span) => {
    if (!span.closest("span:not(:scope)")) {
      outermostSpansString.push(span.outerHTML);
      outermostSpans.push(span);
      const node = span.querySelector("[data-type='handle']");
      if (node) {
        handleTextNodeData.push(node.innerHTML);
      }
    }
  });

  return {
    outermostSpansString,
    outermostSpans,
    handleTextNodeData,
  };
};

export const isSpanWithStyle = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let isStyle = false;
  doc.querySelectorAll("span").forEach((span) => {
    if (!span.closest("span:not(:scope)")) {
      if (span.hasAttribute("class")) isStyle = true;
    }
  });

  return isStyle;
};
