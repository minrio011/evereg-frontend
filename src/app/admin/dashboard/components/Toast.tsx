import React from "react";
import { ToastState } from "../types";

interface ToastProps {
  toast: ToastState | null;
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type === 'error' ? 'bg-red-600' : 'bg-secondary'}`}>
      {toast.msg}
    </div>
  );
}
