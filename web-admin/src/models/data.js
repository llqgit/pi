
import request from '../utils/request';

export default {

  namespace: 'data',

  state: {
    temperature: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(() => {
        setInterval(() => {
          dispatch({
            type: 'fetchTemperature',
          });
        }, 1000);
      });
    },
  },

  effects: {
    *fetchTemperature({ payload }, { put }) {
      const { data } = yield request('/temperature');
      yield put({
        type: 'save',
        payload: {
          temperature: data / 1000,
        },
      });
    },
    *fetch({ payload }, { put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
