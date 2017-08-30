import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

class Temperature extends Component {
  render() {
    const format = (percent) => {
      let value = (Math.floor(percent) === percent ? percent.toFixed(0) : percent.toFixed(1));
      return `${value}°C`;
    };
    const status = (this.props.value >= 70 ? 'exception' : 'success');
    return (
      <Progress
        type="dashboard"
        percent={this.props.value}
        format={format}
        status={status}
      />
    );
  }
}

Temperature.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Temperature;
