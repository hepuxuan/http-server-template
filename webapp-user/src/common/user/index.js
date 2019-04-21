import React from "react";
import styles from "./index.css";

function User({ user }) {
  return (
    <>
      <h1 className={styles.title}>User Info</h1>
      <p>hello {user.Name}</p>
    </>
  );
}

export { User };
