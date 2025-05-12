import { Input } from "../Input";
import styles from "./styles.module.css";

type FormProps = {
  children: React.ReactNode;
};

export function Form({ children }: FormProps) {
  console.log(children);

  return (
    <form className={styles.form} action={""}>
      <div className="formField">
        <Input id={styles.input}/>
      </div>

      
    </form>
  );
}
