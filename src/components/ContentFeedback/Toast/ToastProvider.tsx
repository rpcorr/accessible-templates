import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import {
  ToastContext,
  type ToastItem,
  type ToastOptions,
} from './ToastContext';
import { ToastContainer } from './ToastContainer';

interface ToastProviderProps {
  children: ReactNode;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const focusTargets = useRef<Map<string, HTMLElement>>(new Map());

  const toastLimit = Math.max(1, maxToasts);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));

    focusTargets.current.delete(id);
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
    focusTargets.current.clear();
  }, []);

  const restoreFocus = useCallback((id: string) => {
    const target = focusTargets.current.get(id);

    focusTargets.current.delete(id);

    if (!target || !target.isConnected) {
      return;
    }

    window.requestAnimationFrame(() => {
      target.focus();
    });
  }, []);

  const dismissToastAndRestoreFocus = useCallback(
    (id: string) => {
      setToasts((current) => current.filter((toast) => toast.id !== id));

      restoreFocus(id);
    },
    [restoreFocus],
  );

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${++nextId.current}`;

      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        focusTargets.current.set(id, activeElement);
      }

      const newToast: ToastItem = {
        id,
        type: 'info',
        duration: 5000,
        ...options,
      };

      setToasts((current) => {
        const updated = [...current, newToast];

        const visibleToasts = updated.slice(-toastLimit);

        const visibleIds = new Set(visibleToasts.map((item) => item.id));

        for (const toastItem of updated) {
          if (!visibleIds.has(toastItem.id)) {
            focusTargets.current.delete(toastItem.id);
          }
        }

        return visibleToasts;
      });

      return id;
    },
    [toastLimit],
  );

  const value = useMemo(
    () => ({
      toast,
      dismissToast,
      dismissAll,
    }),
    [toast, dismissToast, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer
        toasts={toasts}
        position={position}
        onDismiss={dismissToast}
        onDismissAndRestoreFocus={dismissToastAndRestoreFocus}
      />
    </ToastContext.Provider>
  );
}
