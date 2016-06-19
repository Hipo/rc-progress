'use strict';

var assign = require('object-assign');
var React = require('react');
var defaultProps = require('./defaultProps');

var Line = React.createClass({
  displayName: 'Line',

  render: function render() {
    var props = assign({}, this.props);
    var pathStyle = {
      'strokeDasharray': '100px, 100px',
      'strokeDashoffset': 100 - props.percent + 'px',
      'transition': props.transition ? props.transition : defaultProps.transition
    };

    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor', 'strokeLinecap'].forEach(function (item) {
      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
        props.trailWidth = props.strokeWidth;
        return;
      }
      if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) || parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
        props[item] = defaultProps[item];
        return;
      }
      if (!props[item]) {
        props[item] = defaultProps[item];
      }
    });

    var strokeWidth = props.strokeWidth;
    var center = strokeWidth / 2;
    var right = 100 - strokeWidth / 2;
    var pathString = 'M ' + center + ',' + center + ' L ' + right + ',' + center;
    var viewBoxString = '0 0 100 ' + strokeWidth;

    return React.createElement(
      'svg',
      { className: 'rc-progress-line', viewBox: viewBoxString, preserveAspectRatio: 'none' },
      React.createElement('path', { className: 'rc-progress-line-trail', d: pathString, strokeLinecap: props.strokeLinecap,
        stroke: props.trailColor, strokeWidth: props.trailWidth, fillOpacity: '0' }),
      React.createElement('path', { className: 'rc-progress-line-path', d: pathString, strokeLinecap: props.strokeLinecap,
        stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
    );
  }
});

module.exports = Line;