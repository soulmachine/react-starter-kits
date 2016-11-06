import React, {Component} from 'react';
import Counter from './components/Counter';
import CounterStore from './stores/CounterStore';

//styles
import './App.less';
import styles from './Modules.css';

class App extends Component {
  render() {
    const counterStore = new CounterStore();
    return (
      <Counter store={ counterStore } />
    )
  }
}

export default App;
