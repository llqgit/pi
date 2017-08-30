import React from 'react';
import mirror, {actions, connect, render} from 'mirrorx';
import io from 'socket.io-client';
import request from 'request';
import Joystick from './components/Joystick';
import Temperature from './components/Temperature';

const ip = 'http://localhost';
const port = 5000;

const socket = io(`${ip}:${port}`, { rememberTransport: false });

socket.on('reconnecting', (reconnectTimes) => {
  console.log('reconnecting', reconnectTimes);
});

socket.on('disconnect', (reason) => {
  console.log('disconnect', reason);
});

socket.on('event', (data) => {
  console.log('event', data);
});

socket.on('message', (data) => {
  console.log('message', data);
  actions.app.set(data);
});

// 声明 Redux state, reducer 和 action，
// 所有的 action 都会以相同名称赋值到全局的 actions 对象上
mirror.model({
  name: 'app',
  initialState: 0,
  reducers: {
    set(state, payload) {
      console.log(payload);
      return payload;
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
  return {count: state.app}
})(props => (
    <div>
      <h1>{props.count}</h1>
      <Temperature value={69} />
      <Joystick
        onDrag={(position) => { actions.app.move(position) }}
        onStop={() => { actions.app.stop() }}
      />
    </div>
  )
)

// 启动 app，render 方法是加强版的 ReactDOM.render
render(<App/>, document.getElementById('root'))
