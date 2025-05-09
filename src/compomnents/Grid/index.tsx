import styles from "./styles.module.css";

type GridProps = {
  children: React.ReactNode;
};

export function Grid({ children }: GridProps) {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
