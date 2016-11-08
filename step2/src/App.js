import React, {Component} from 'react';
import Counter from './components/Counter';
import {Provider} from 'mobx-react';

//styles
import './App.less';
import styles from './Modules.css';

import {counterStore} from './stores/CounterStore';

const stores = {
  counterStore,
}


class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Counter />
      </Provider>
    )
  }
}

export default App;
