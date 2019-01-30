import * as React from "react";

import { diel } from "../diel/setup";

interface CounterProp {
  color: string;
}
interface CounterState {
  count: number;
}

export default class BasicDBCounter extends React.Component<CounterProp, CounterState> {
  constructor(props: CounterProp) {
    console.log(diel);
    super(props);
    this.state = {
      count: 0
    };
  }
  evalDielView() {
    // although this is calling via diel, it is just using the database directly
    const count = diel.db.exec(`SELECT SUM(value) FROM interactions`)[0].values[0][0] as number;
    this.setState({count});
  }
  setCountState(count: number) {
    this.setState({count});
  }
  render() {
    const result = diel.db.exec(`SELECT * FROM interactions`)[0];
    const events = result ? <>
          <p>Here are the events we have recorded</p>
        <table style={{fontFamily: "courier"}}>
        <thead>
          {result.columns.map(c => <th>{c}</th>)}
        </thead>
        <tbody>
          {result.values.map(r => (<tr>{r.map((c, _) => (<td>{c}</td>))}</tr>))}
        </tbody>
      </table>
    </> : <p>Click a button!</p>;

    return <>
      <p style={{color: this.props.color}}>{this.state.count}</p>
      <button onClick={() => {
        diel.db.exec(`INSERT INTO interactions (value) VALUES (1)`);
        this.evalDielView();
      }}>add</button>
      <button onClick={() => {
        diel.db.exec(`INSERT INTO interactions (value) VALUES (-1)`);
        this.evalDielView();
      }}>sub</button>
      {events}
    </>;
  }
}