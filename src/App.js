import React from "react";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const inc = () => ({
  type: "increment",
});

const dec = () => ({
  type: "decrement",
});

const change = (changeValue) => ({
  type: "change",
  changeValue,
});

const calculate = () => ({
  type: "calculate",
});

function reducer(
  state = {
    counter: 0,
    changeValue: 0,
  },
  action
) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };

    case "decrement":
      return { ...state, counter: state.counter - 1 };

    case "calculate": {
      return { ...state, counter: state.counter + state.changeValue };
    }

    case "change": {
      return { ...state, changeValue: action.changeValue };
    }

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Counter = ({
  counter,
  changeValue,
  onCalculateClick,
  onChangeValueChange,
  onIncrementClick,
  onDecrementClick,
}) => (
  <div>
    <button onClick={onDecrementClick}>-</button>
    {counter}
    <input
      type="number"
      value={changeValue}
      onChange={(e) => onChangeValueChange(e.target.valueAsNumber)}
    />
    <button onClick={onCalculateClick}>Change</button>
    <button onClick={onIncrementClick}>+</button>
  </div>
);

const mapStateToProps = ({ counter, changeValue }) => ({
  counter,
  changeValue,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrementClick: () => dispatch(inc()),
  onDecrementClick: () => dispatch(dec()),
  onCalculateClick: () => dispatch(calculate()),
  onChangeValueChange: (changeValue) => dispatch(change(changeValue)),
});

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>
);

export default App;
