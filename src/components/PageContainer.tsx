import * as React from "react";
import { diel } from "../diel/setup";

interface CounterProp {
  color: string;
}
interface CounterState {
  count: number;
}


export default class Counter extends React.Component<CounterProp, CounterState> {
  constructor(props: CounterProp) {
    console.log(diel);
    super(props);
    // this.add = this.add.bind(this);
    this.state = {
      count: 0
    };
  }
  evalDielView() {
    // this.setState(prevState => ({
    //   count: prevState.count + 1
    // }));
    diel.views.count.bind({});
    diel.views.count.step();
    const count = diel.views.count.getAsObject().count as number;
    this.setState({count});
  }
  render() {
    return <>
      <p style={{color: this.props.color}}>{this.state.count}</p>
      <button onClick={() => {
        diel.interactions.add.run({});
        this.evalDielView();
      }}>add</button>
    </>;
  }
}