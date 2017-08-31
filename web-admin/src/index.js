import React from 'react';
import mirror, {actions, connect, render} from 'mirrorx';
import { Row, Col, Switch, Icon, Button } from 'antd';
import io from 'socket.io-client';
import request from 'request';
import Joystick from './components/Joystick';
import Temperature from './components/Temperature';
import Motion from './components/Motion';

// const ip = 'http://pi.local';
const ip = 'http://pi.local';
const port = 80;

const socket = io(`${ip}:${port}`, { rememberTransport: false });

socket.on('reconnecting', (reconnectTimes) => {
  console.log('reconnecting', reconnectTimes);
});

socket.on('disconnect', (reason) => {
  console.log('disconnect', reason);
});

socket.on('event', (data) => {
  // console.log('event', data);
  const { type, payload } = data;
  switch (type) {
    case 'sys':
      actions.app.set(payload);
      break;
    default:

  }
});

socket.on('message', (data) => {
  console.log('message', data);
  actions.app.set({data});
});

// 声明 Redux state, reducer 和 action，
// 所有的 action 都会以相同名称赋值到全局的 actions 对象上
mirror.model({
  name: 'app',
  initialState: {
    temperature: {
      cpu: 0,
      gpu: 0,
    },
    disk: {
      available: 100,
      capacity: 100,
      used: 1,
    },
    memory: {
      MemUsed: 0,
      MemTotal: 100,
      MemFree: 100,
    }
  },
  reducers: {
    set(state, payload) {
      return { ...state, ...payload};
    },
    decrement(state) { return state - 1 }
  },
  effects: {
    async incrementAsync() {
      socket.emit('message', 'ssdfadsfa');
      // actions.app.increment()
    },
    async up() {
      socket.emit('message', 'up');
      // actions.app.increment()
    },
    async down() {
      socket.emit('event', { type: 'down' });
    },
    async move(position) {
      socket.emit('event', { type: 'move', x: position.x, y: position.y });
    },
    async stop() {
      socket.emit('event', { type: 'stop' });
    },
  }
})

// 使用 react-redux 的 connect 方法，连接 state 和组件
const App = connect(state => {
  return state.app;
})(props => (
    <div>
      <Row type="flex" justify="space-around" align="center" style={{ padding: 5 }}>
        <Col span={5}>
          <Temperature title="CPU" value={props.temperature.cpu} />
        </Col>
        <Col span={5}>
          <Temperature title="GPU" value={props.temperature.gpu} />
        </Col>
        <Col span={5}>
          <p><small>剩余:</small>{(props.disk.available / 1000000000).toFixed(2)}<small>G</small></p>
          <p><small>占用:</small>{(props.disk.used / props.disk.capacity * 100).toFixed(1)}<small>%</small></p>
          <p><small>总共:</small>{(props.disk.capacity / 1000000000).toFixed(2)}<small>G</small></p>
          <p><small>内存:</small>{(props.memory.MemUsed / props.memory.MemTotal * 100 ).toFixed(2)}<small>%</small></p>
        </Col>
        <Col span={5}>
          <Row type="flex" justify="space-around" align="center">
            <Col span={20} style={{ padding: 4 }}>
              <Switch checkedChildren={<Icon type="camera" />} unCheckedChildren={<Icon type="camera" />} />
            </Col>
            <Col span={20} style={{ padding: 4 }}>
              <Button><Icon type="camera" /></Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ padding: '0px 0px 16px 0px' }}>
        <canvas style={{ backgroundColor: '#eee', width: '100%' }}>

        </canvas>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <Joystick
            r={80}
            btnR={20}
            onDrag={(position) => { actions.app.move(position) }}
            onStop={() => { actions.app.stop() }}
          />
        </Col>
      </Row>
    </div>
  )
)

// 启动 app，render 方法是加强版的 ReactDOM.render
render(<App/>, document.getElementById('root'))
