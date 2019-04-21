import React from "react";

class Layout extends React.Component {
  render() {
    const { children, title, js, initialProps, css, vendor } = this.props;
    return (
      <html>
        <head>
          <title>{title}</title>
          {css ? <link rel="stylesheet" href={css} /> : null}
        </head>
        <body>
          <div id="react-body">{children}</div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.__SERVER_DATA__ = {
              initialProps: ${JSON.stringify(initialProps)}
            };
          `
            }}
          />
          {js ? (
            <>
              <script src={js} />
              <script src={vendor} />
            </>
          ) : null}
        </body>
      </html>
    );
  }
}

export default Layout;
