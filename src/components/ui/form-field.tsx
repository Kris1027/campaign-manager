import type { ReactNode } from 'react';
import styles from './form-field.module.css';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}

function FormField({ label, htmlFor, hint, error, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor}>
        {label}
        {hint && <span className={styles.hint}> {hint}</span>}
      </label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormField;
