// import styles from "./styles.module.css";

import { Link } from "react-router";

// type LoginProps = {
//   children: React.ReactNode;
// };

export function NotFound() {
  return (
    <>
      <Link to="/home"><div>Not Found </div></Link>
    </>
  );
}
