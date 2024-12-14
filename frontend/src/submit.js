// submit.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "./store";
import { useModal } from "./hooks/useModal";

const selector = (state) => ({
  isOpen: state.isOpen,
  onOpen: state.onOpen,
  onClose: state.onClose,
  data: state.data,
});

export const SubmitButton = () => {
  const [nodesData, setNodesData] = useState([]);
  const [edgesData, setEdgesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore();
  const { onOpen } = useModal(selector);

  useEffect(() => {
    const filterNodesData = [];
    const filteredgesdata = [];
    nodes.forEach((node) => {
      filterNodesData.push(node.id);
    });
    edges.forEach((edge) => {
      filteredgesdata.push({
        from: edge.source,
        to: edge.target,
      });
    });
    setNodesData(filterNodesData);
    setEdgesData(filteredgesdata);
  }, [nodes, edges]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const pipeline = {
        nodesData,
        edgesData,
      };
      formData.append("pipeline", JSON.stringify(pipeline));
      const res = await axios.post(
        "http://localhost:8000/pipelines/parse",
        formData,
        {
          "Content-type": "multiform/form-data",
        }
      );
      const { num_nodes, num_edges, is_dag } = res.data;
      onOpen(num_nodes, num_edges, is_dag);
    } catch (e) {
      console.log(e); // catches the error by api
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="px-4 py-2 rounded-md border border-gray-200 bg-blue-500 text-white text-xs font-mono font-semibold"
      >
        Submit
      </button>
    </div>
  );
};
