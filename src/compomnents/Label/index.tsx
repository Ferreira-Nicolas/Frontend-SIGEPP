import styles from "./styles.module.css";

type LabelProps = {
  children: React.ReactNode;
};

export function Label({ children }: LabelProps) {
  return (
    <>
      <div className={styles.label}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
