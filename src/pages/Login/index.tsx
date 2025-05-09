import styles from "./styles.module.css";

type LoginProps = {
  children: React.ReactNode;
};

export function Login({ children }: LoginProps) {
  return (
    <>
      <div className={styles.login}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
