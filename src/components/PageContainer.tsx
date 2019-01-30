import * as React from "react";
import ReactCounter from "./ReactCounter";
import BasicDBCounter from "./BasicDBCounter";

export const PageContainer: React.StatelessComponent<{}> = () => {
  return <>
  <p>This is a counter implemented in React</p>
  <ReactCounter
    color={"red"}
  />
  <p>Below is the same counter implemented using databases</p>
  <BasicDBCounter
    color={"green"}
  />
  </>;
};