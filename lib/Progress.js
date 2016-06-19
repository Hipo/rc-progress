'use strict';

var assign = require('object-assign');
var React = require('react');
var defaultProps = require('./defaultProps');
var Line = require('./Line');

var Circle = React.createClass({
  displayName: 'Circle',

  render: function render() {
    var props = assign({}, this.props);
    var strokeWidth = props.strokeWidth;
    var radius = 50 - strokeWidth / 2;
    var pathString = 'M 50,50 m 0,-' + radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
    var len = Math.PI * 2 * radius;
    var pathStyle = {
      'strokeDasharray': len + 'px ' + len + 'px',
      'strokeDashoffset': (100 - props.percent) / 100 * len + 'px',
      'transition': props.transition ? props.transition : defaultProps.transition
    };

    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor', 'strokeLinecap'].forEach(function (item) {
      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
        props.trailWidth = props.strokeWidth;
        return;
      }
      if (!props[item]) {
        props[item] = defaultProps[item];
      }
    });

    return React.createElement(
      'svg',
      { className: 'rc-progress-circle', viewBox: '0 0 100 100' },
      React.createElement('path', { className: 'rc-progress-circle-trail', d: pathString, stroke: props.trailColor,
        strokeWidth: props.trailWidth, fillOpacity: '0' }),
      React.createElement('path', { className: 'rc-progress-circle-path', d: pathString, strokeLinecap: props.strokeLinecap,
        stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
    );
  }
});

module.exports = {
  Line: Line,
  Circle: Circle
};