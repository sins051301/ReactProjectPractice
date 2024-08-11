import { createStore } from 'redux';

// 리듀서 함수 정의
const counterReducer = (state = { counter: 0 }, action) => {
  // action.type에 따라 분기 처리
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }
  return state; // 기본적으로는 현재 상태를 반환
};

// 중앙 상태 저장소 생성
const store = createStore(counterReducer);

// 업데이트된 후에 최신 상태 반영
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// 구독 단계
store.subscribe(counterSubscriber);

// 액션을 발송하는 메서드
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });