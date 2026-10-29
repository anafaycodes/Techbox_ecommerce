import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

export default function CartToast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="tb-toast"
        >
          <div className="tb-toast__icon"><Check size={18} /></div>
          <div className="tb-toast__content">
            <p className="tb-toast__message">{toast.message}</p>
            <Link to="/cart" className="tb-toast__link">View cart</Link>
          </div>
          <button onClick={onClose} className="tb-toast__close" aria-label="Dismiss">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
