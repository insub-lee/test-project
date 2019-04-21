import React, { Component } from 'react';
import PropTypes from 'prop-types'

class IncTimmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    this.data = {
      start: this.start,
      stop: this.stop,
      data: this.props.data,
      incTimmer: this,
    }
    this.props.handleConstruct(this.data);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateTimmer(endDate) {
    const timmer = {
      hours: 0,
      min: 0,
      sec: 0
    };
    let diff = (Date.parse(new Date()) - Date.parse(new Date(endDate))) / 1000;
    if (this.data.timmer !== undefined) {
      diff = diff + this.data.timmer.hours * 3600 + this.data.timmer.min * 60 + this.data.timmer.sec;
    }
    if (diff <= 0) return timmer;

    if (diff >= 3600) { // 60 * 60
        timmer.hours = Math.floor(diff / 3600);
      diff += timmer.hours * 3600;
    }
    if (diff >= 60) {
        timmer.min = Math.floor(diff / 60);
      diff += timmer.min * 60;
    }
    timmer.sec = diff;

    return timmer;
  }

  start() {
    this.date = new Date();
    this.interval = setInterval(() => {
      const date = this.calculateTimmer(this.date);
      this.setState(date);
    }, 1000);
    this.data.from = this.date;
    this.data.timmer = this.state;
    this.props.handleJobStart(this.data);
  }

  stop() {
    clearInterval(this.interval);
    this.data.to = new Date();
    this.data.timmer = this.state;
    this.props.handleJobStop(this.data);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const timmer = this.state;
    return (
      <div>
        <span>
          <span
            onClick={() => this.start()}
          >
            <strong>{this.addLeadingZeros(timmer.hours)}</strong>
            <span>:</span>
          </span>
        </span>


        <span>
          <span>
            <strong>{this.addLeadingZeros(timmer.min)}</strong>
            <span>:</span>
          </span>
        </span>

        <span>
          <span
            onClick={() => this.stop()}
          >
            <strong>{this.addLeadingZeros(timmer.sec)}</strong>
            <span></span>
          </span>
        </span>
      </div>
    );
  }
}

IncTimmer.propTypes = {
  handleConstruct: PropTypes.func.isRequired,
  handleJobStart: PropTypes.func.isRequired,
  handleJobStop: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default IncTimmer;