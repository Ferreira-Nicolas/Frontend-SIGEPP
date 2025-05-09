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
        <Input/>
      </div>

      <div className="formField">
        <label htmlFor="meuForm">Task</label>
        <input id="meuForm" type="text" />
      </div>

      <div className="formField">
        <label htmlFor="meuForm">Task</label>
        <input id="meuForm" type="text" />
      </div>
    </form>
  );
}
