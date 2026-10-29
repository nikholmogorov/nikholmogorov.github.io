import { useEffect, useRef } from "react";

import { USERS } from "@/constants";

import type { ModalProps } from "@/types";

export function Modal(props: ModalProps) {
  const { post, onClose } = props;
  const { userId, id, title, body } = post;

  const dialogRef = useRef<HTMLDialogElement>(null);

  // useEffect обычный
  //   useEffect(() => {
  //     const dialog = dialogRef.current;
  //     if (!dialog) return;
  //     const scrollY = window.scrollY;
  //     dialog.showModal();
  //     return () => {
  //       if (dialog.open) dialog.close();
  //       requestAnimationFrame(() => {
  //         window.scrollTo(0, scrollY);
  //       });
  //     };
  //   }, []);

  // useEffect для Safari
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousStyle = body.getAttribute("style");
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
    });
    if (scrollbarWidth) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (previousStyle === null) body.removeAttribute("style");
      else body.setAttribute("style", previousStyle);
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    };
  }, []);

  return (
    <dialog
      className="fixed left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[37.5rem] overflow-x-hidden overflow-y-auto border border-[color:var(--color-element)] bg-[var(--color-background)] text-[color:var(--color-element)] backdrop:bg-black/40 backdrop:backdrop-blur-sm p-5"
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
          className="absolute top-[-1px] right-[-1px] aspect-square w-[40px] p-0! text-4xl leading-[1] max-[500px]:focus-visible:outline-none!"
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
        >
          ×
        </button>
      </div>
      <h2
        className="text-xl font-semibold"
        id="modal-title"
      >
        {title}
      </h2>
      <p>{body}</p>
    </dialog>
  );
}
