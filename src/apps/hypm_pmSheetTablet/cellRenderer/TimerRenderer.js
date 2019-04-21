 import React, { Component } from 'react';

const leftPad = (width, n) => {
    if ((n + '').length > width) {
        return n;
    }
    const padding = new Array(width).join('0');
    return (padding + n).slice(-width);
  };
                  
  export default class Stopwatch extends Component {
    constructor(props) {
      super(props);
      
      ["lap", "update", "toggle"].forEach((method) => {
          this[method] = this[method].bind(this);
      });
  
      this.state = this.initialState = {
        isRunning: false,
        lapTimes: [],
        timeElapsed: 0,
      };
    }

    toggle() {
      this.setState({isRunning: !this.state.isRunning}, () => {
        this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
      });

      if (this.state.isRunning) {
        this.props.onCheckAllTime(this.state.timeElapsed);
      }
    }

    lap() {
      const {lapTimes, timeElapsed} = this.state;
      this.setState({lapTimes: lapTimes.concat(timeElapsed)});
    }

    // reset() {
    //   clearInterval(this.timer);
    //   this.setState(this.initialState);                                                                                                                        
    // }

    startTimer() {
      this.startTime = Date.now();
      this.timer = setInterval(this.update, 10);
    }

    update() {
      const delta = Date.now() - this.startTime;
      this.setState({timeElapsed: this.state.timeElapsed + delta});
      this.startTime = Date.now();
    }

    render() {
      const {isRunning, lapTimes, timeElapsed} = this.state;
      return (
        <div>
          <TimeElapsed id="timer" timeElapsed={timeElapsed} />
          {/* /<button onClick={this.toggle}>
            {isRunning ? 'Stop' : 'Start'}
          </button> */}
        </div>
      );
    }
  }

  class TimeElapsed extends React.Component {
    getUnits() {
      const seconds = this.props.timeElapsed;

      return {
        hour: Math.floor((seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString(),
        min: Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60)).toString(),
        sec: Math.floor((seconds % (1000 * 60)) / 1000).toString()
      };
    }

    render() {
      const units = this.getUnits();
      return (
        <div id={this.props.id} style={{ textAlign: 'center' }} >
          <span>{leftPad(2, units.hour)}:</span>
          <span>{leftPad(2, units.min)}:</span>
          <span>{leftPad(2, units.sec)}</span>
        </div>
      );
    }
  }
