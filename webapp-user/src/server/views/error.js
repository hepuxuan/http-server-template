import React from "react";
import Layout from "./layout";

function Error({ message, error, title }) {
  return (
    <Layout title={title}>
      <h1>{message}</h1>
      <h2>{error.status}</h2>
      <pre>{error.stack}</pre>
    </Layout>
  );
}

export default Error;
