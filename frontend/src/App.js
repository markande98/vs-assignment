import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import Modal from "./components/modal";
import { useModal } from "./hooks/useModal";
import { Alert } from "./alert";

const selector = (state) => ({
  isOpen: state.isOpen,
  onOpen: state.onOpen,
  onClose: state.onClose,
  data: state.data,
});

function App() {
  const { isOpen, onClose, data } = useModal(selector);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Alert nodes={data?.nodes} edges={data?.edges} isDag={data?.isDag} />
      </Modal>
      <div className="m-2 border border-gray-400 h-[calc(100vh-16px)] rounded-md flex flex-col">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </>
  );
}

export default App;
