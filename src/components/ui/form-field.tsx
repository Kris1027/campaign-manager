import type { ReactNode } from 'react';
import styles from './form-field.module.css';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
  group?: boolean;
}

function FormField({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
  group,
}: FormFieldProps) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  if (group) {
    return (
      <fieldset
        className={[styles.fieldset, className].filter(Boolean).join(' ')}
      >
        <legend className={styles.legend}>{label}</legend>
        {children}
        {error && <span className={styles.error}>{error}</span>}
      </fieldset>
    );
  }

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={htmlFor}>
        {label}
        {hint && <span className={styles.hint}> {hint}</span>}
      </label>
      {children}
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
