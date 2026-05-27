import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
    e.preventDefault();
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label='Close'
        >
          <FiX aria-hidden='true' />
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </dialog>
  );
}

export default Modal;
