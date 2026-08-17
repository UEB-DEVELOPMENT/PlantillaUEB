"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@ueb-development/ui/components/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; // New prop to control close button visibility
  isFullscreen?: boolean; // Default to false for backwards compatibility
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={
          isFullscreen
            ? "h-[100dvh] w-screen max-w-none rounded-none"
            : `max-h-[90dvh] overflow-y-auto ${className}`
        }
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};