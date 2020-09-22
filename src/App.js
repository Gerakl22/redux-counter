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

const initialState = 0;

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

const Counter = ({ counter, changeValue, dispatch }) => (
  <div>
    <button onClick={() => dispatch(dec())}>-</button>
    {counter}
    <input
      type="number"
      value={changeValue}
      onChange={(e) => dispatch(change(e.target.valueAsNumber))}
    />
    <button onClick={() => dispatch(calculate())}>Change</button>
    <button onClick={() => dispatch(inc())}>+</button>
  </div>
);

const mapStateToProps = ({ counter, changeValue }) => ({
  counter,
  changeValue,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>
);

export default App;
