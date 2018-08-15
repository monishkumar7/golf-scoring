import React, { Fragment } from "react";

import Header from "./Header/Header";

const layout = props => (
  <Fragment>
    <Header auth={props.auth} userName={props.userName} />
    <main>{props.children}</main>
  </Fragment>
);

export default layout;
