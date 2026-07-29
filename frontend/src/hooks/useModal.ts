import { useState, useCallback } from "react";

/**
 * Simple modal state manager.
 * Usage: const { isOpen, open, close } = useModal();
 */
export const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
};
