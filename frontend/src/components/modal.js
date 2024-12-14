import { RxCross2 } from "react-icons/rx";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md m-4 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <RxCross2 size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
