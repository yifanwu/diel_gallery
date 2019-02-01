import * as React from "react";
import * as d3 from "d3";

import { diel } from "../diel/setup";

interface StaticD3BarChartProp {
  width: number;
  height: number;
}

type MyChartData = {animal: string, count: number};

interface StaticD3BarChartState {
  data: MyChartData[];
}

export default class StaticD3BarChart extends React.Component<StaticD3BarChartProp, StaticD3BarChartState> {
  constructor(props: StaticD3BarChartProp) {
    super(props);
    let data: MyChartData[] = [];
    const dataPrepared = diel.db.prepare(`SELECT animal, count() as count from attendee group by animal`);
    dataPrepared.bind({});
    while (dataPrepared.step()) {
      data.push(dataPrepared.getAsObject() as any);
    }
    this.state = {
      data
    };
  }
  render() {
    const {data} = this.state;
    const {width, height} = this.props;
    const maxCount = d3.max(data.map(d => d.count));
    const barWidth = width / (data.length + 1);
    // cat: 2, dog: 3
    const rects = data.map((d, i) => {
      return <rect x={width / data.length + i * barWidth} y={0} width={ barWidth } height={height / maxCount * d.count}></rect>;
    });
    return <svg>
     {rects}
    </svg>;
  }
}