import styles from "./styles.module.css";

type SearchInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export function SearchInput({ id, type, labelText, ...rest }: SearchInputProps) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <input id={id} type={type} {...rest} className={styles.input}/>
    </>
  );
}
