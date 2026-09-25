import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl animate-slide-up transition-all ${
              isSuccess
                ? 'bg-slate-900 text-white dark:bg-slate-800 border border-slate-700/60'
                : isError
                ? 'bg-rose-900 text-rose-50 border border-rose-700'
                : 'bg-slate-900 text-white dark:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {isError && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
              {!isSuccess && !isError && <Info size={18} className="text-orange-400 shrink-0" />}
              <span className="text-xs font-semibold leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
