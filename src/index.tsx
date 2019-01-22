import * as React from "react";
import * as ReactDOM from "react-dom";

import Counter from "./components/PageContainer";

// this is the place where DIEL should be loaded with the
// generated .db file
export function loadPage() {
  console.log("loading page!");
  ReactDOM.render(
    <Counter
      color="red"
    />,
    document.getElementById("wrapper")
  );
}