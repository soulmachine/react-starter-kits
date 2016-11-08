import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('counterStore')
@observer
export default class Counter extends Component {
  handleInc = () => {
    this.props.counterStore.increment();
  };

  handleDec = () => {
    this.props.counterStore.decrement(); 
  };

  handleIncAsync = () => {
    this.props.counterStore.incrementAsync();
  };

  render() {
    return (
      <div>
        Counter: {this.props.counterStore.count} {'  '}
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
        <button onClick={this.handleIncAsync}> Increment async </button>
      </div>
    );
  }
}

Counter.propTypes = {
  counterStore: React.PropTypes.object,
}

