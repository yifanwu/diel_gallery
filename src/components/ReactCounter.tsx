import * as React from "react";

interface CounterProp {
  color: string;
}
interface CounterState {
  count: number;
}

export default class ReactCounter extends React.Component<CounterProp, CounterState> {
  constructor(props: CounterProp) {
    super(props);
    this.add = this.add.bind(this);
    this.state = {
      count: 0
    };
  }
  add() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }
  sub() {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  }
  render() {
    return <>
      <p style={{color: this.props.color}}>{this.state.count}</p>
      <button onClick={this.add}>add</button>
      <button onClick={this.sub}>sub</button>
    </>;
  }
}