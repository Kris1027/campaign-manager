import Modal from './modal';
import Button from './button';
import styles from './confirm-dialog.module.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
