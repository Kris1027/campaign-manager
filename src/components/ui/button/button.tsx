import type { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export default Button;
