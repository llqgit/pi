import React from 'react';
import { connect } from 'dva';
import { Row, Progress } from 'antd';
// import styles from './IndexPage.less';

function IndexPage({ temperature }) {
  const format = (value) => {
    return `${value}°C`;
  };

  return (
    <div style={{ width: 500, padding: 100 }}>
      <Row>
        <Progress percent={temperature} strokeWidth={5} status="active" format={format} />
      </Row>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(props) {
  const { data } = props;
  return data || {};
}

export default connect(mapStateToProps)(IndexPage);
