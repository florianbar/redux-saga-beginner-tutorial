import { put, takeEvery, all } from "redux-saga/effects";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* decrementAsync() {
  yield delay(1000);
  yield put({ type: "DECREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchDecrementAsync() {
  yield takeEvery("DECREMENT_ASYNC", decrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchDecrementAsync()]);
}
