import Button from './button';
import styles from './error-fallback.module.css';

function ErrorFallback() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Campaign Manager</h1>
      <p className={styles.message}>
        Something went wrong. Please reload to try again.
      </p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );
}

export default ErrorFallback;
