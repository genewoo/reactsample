"use strict";

var ClockFace = React.createClass({
  displayName: "ClockFace",

  render: function render() {
    var d = this.props.date;
    var millis = d.getMilliseconds();
    var second = d.getSeconds() * 6 + millis * (6 / 1000);
    var minute = d.getMinutes() * 6 + second / 60;
    var hour = d.getHours() % 12 / 12 * 360 + 90 + minute / 12;

    return React.createElement(
      "div",
      { className: "background" },
      React.createElement(
        "div",
        { className: "circle" },
        React.createElement(
          "div",
          { className: "face" },
          React.createElement("div", { className: "second", style: transform(rotate(second)) }),
          React.createElement("div", { className: "hour", style: transform(rotate(hour)) }),
          React.createElement("div", { className: "minute", style: transform(rotate(minute)) })
        )
      )
    );
  }
});

function transform(str) {
  return { transform: str };
}

function rotate(deg) {
  return 'rotate(' + deg + 'deg)';
}

var AnalogClock = React.createClass({
  displayName: "AnalogClock",

  getInitialState: function getInitialState() {
    return { date: new Date() };
  },
  componentDidMount: function componentDidMount() {
    this.start();
  },
  start: function start() {
    var self = this;
    (function tick() {
      self.setState({ date: new Date() });
      requestAnimationFrame(tick);
    })();
  },
  render: function render() {
    return React.createElement(ClockFace, { date: this.state.date });
  }
});

// React.renderComponent(<AnalogClock />, document.body);
var calendar = document.getElementById('container');
ReactDOM.render(React.createElement(AnalogClock, null), calendar);