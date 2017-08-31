import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Row, Col } from 'antd';

class Temperature extends Component {
  render() {
    const format = (percent) => {
      let value = (Math.floor(percent) === percent ? percent.toFixed(0) : percent.toFixed(1));
      return `${value}°C`;
    };
    const status = (this.props.value >= 70 ? 'exception' : 'success');
    return (
      <Row type="flex" justify="center" style={{ width: this.props.width || 60 }}>
        <Col span={24}>
          <Progress
            type="dashboard"
            width={this.props.width || 60}
            percent={this.props.value}
            format={format}
            status={status}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', top: '-0.8rem' }}>
          <small>{this.props.title || ''}</small>
        </Col>
      </Row>
    );
  }
}

Temperature.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Temperature;
