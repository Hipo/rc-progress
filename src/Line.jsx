const assign = require('object-assign');
const React = require('react');
const defaultProps = require('./defaultProps');

const Line = React.createClass({
  render() {
    const props = assign({}, this.props);
    const pathStyle = {
      'strokeDasharray': '100px, 100px',
      'strokeDashoffset': `${(100 - props.percent)}px`,
      'transition': props.transition ? props.transition : defaultProps.transition,
    };

    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor', 'strokeLinecap'].forEach((item)=> {
      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
        props.trailWidth = props.strokeWidth;
        return;
      }
      if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) ||
        parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
        props[item] = defaultProps[item];
        return;
      }
      if (!props[item]) {
        props[item] = defaultProps[item];
      }
    });

    const strokeWidth = props.strokeWidth;
    const center = strokeWidth / 2;
    const right = (100 - strokeWidth / 2);
    const viewBoxString = `0 0 100 ${strokeWidth}`;
    let pathString;

    if (props.strokeLinecap !== 'butt') {
      pathString = `M ${center},${center} L ${right},${center}`;
    } else {
      pathString = `M ${0},${center} L ${100},${center}`;
    }

    return (
      <svg className="rc-progress-line" viewBox={viewBoxString} preserveAspectRatio="none">
        <path className="rc-progress-line-trail" d={pathString} strokeLinecap={props.strokeLinecap}
              stroke={props.trailColor} strokeWidth={props.trailWidth} fillOpacity="0"/>

        <path className="rc-progress-line-path" d={pathString} strokeLinecap={props.strokeLinecap}
              stroke={props.strokeColor} strokeWidth={props.strokeWidth} fillOpacity="0" style={pathStyle}/>
      </svg>
    );
  },
});

module.exports = Line;
