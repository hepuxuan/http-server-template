import React from "react";
import ReactDom from "react-dom";

function hydrate(Component) {
  const props = window.__SERVER_DATA__.initialProps;
  ReactDom.hydrate(
    <Component {...props} />,
    document.getElementById("react-body")
  );
}

export { hydrate };
