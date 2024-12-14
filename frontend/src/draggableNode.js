// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      // className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      className="flex flex-col items-center border px-4 py-2 space-y-2 rounded-lg hover:cursor-grab"
      draggable
    >
      <Icon size={20} className="text-gray-500" />
      <span className="text-gray-500 text-xs">{label}</span>
    </div>
  );
};
