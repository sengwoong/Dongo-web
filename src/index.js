import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // 여러분의 애플리케이션에서 만들어진 리듀서입니다.
import rootSaga from './sagas'; // 여러분의 애플리케이션에서 만들어진 사가입니다.

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
