import React from "react";
import Layout from "./layout";
import { User } from "../../common/user";

function UserPage({ user, title, js, css, vendor }) {
  return (
    <Layout
      title={title}
      js={js}
      css={css}
      vendor={vendor}
      initialProps={{ user }}
    >
      <User user={user} />
    </Layout>
  );
}

export default UserPage;
