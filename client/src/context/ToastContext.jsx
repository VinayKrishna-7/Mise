import { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { toasts, addToast, removeToast } = useToast();
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
