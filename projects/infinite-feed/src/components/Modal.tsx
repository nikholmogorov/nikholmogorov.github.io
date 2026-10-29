import { useEffect, useRef } from "react";

import { USERS } from "@/constants";

import type { ModalProps } from "@/types";

export function Modal(props: ModalProps) {
  const { post, onClose } = props;
  const { userId, id, title, body } = post;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ``;
    };
  }, []);

  return (
    <dialog
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[37.5rem] border border-[color:var(--color-element)] bg-[var(--color-background)] text-[color:var(--color-element)] overflow-x-hidden  backdrop:bg-black/40 backdrop:backdrop-blur-sm relative p-5"
      ref={dialogRef}
      aria-labelledby="modal-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div>
        <span>#{id}</span>
        <span className="ml-2.5">{USERS[userId]}</span>
        <button
          className="absolute top-[-1px] right-[-1px] aspect-square w-[40px] p-0! text-4xl leading-none"
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
        >
          ×
        </button>
      </div>
      <h2 className="text-xl font-semibold" id="modal-title">
        {title}
      </h2>
      <p>{body}</p>
    </dialog>
  );
}
