import React from 'react'

const Counter = ({ increment, incrementIfOdd, incrementAsync, decrement, counter }) =>
  <div>
    Clicked: {counter} times
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>Increment if odd</button>
    {' '}
    <button onClick={() => incrementAsync()}>Increment async</button>
  </div>

Counter.propTypes = {
  increment: React.PropTypes.func.isRequired,
  incrementIfOdd: React.PropTypes.func.isRequired,
  incrementAsync: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  counter: React.PropTypes.number.isRequired
}

export default Counter
