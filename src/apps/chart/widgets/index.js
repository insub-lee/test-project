import React, { PureComponent } from 'react';
import LineBarAreaComposedChart from './charts/lineBarAreaComposedChart';
import { LineBarAreaComposedChart1 } from './config';

class ReCharts extends PureComponent {
  render() {
    return (
      <LineBarAreaComposedChart
        {...LineBarAreaComposedChart1}
      />
    );
  }
}

export default ReCharts;
