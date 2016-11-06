import { observable, action, useStrict, runInAction } from 'mobx';

useStrict(true);

export default class CounterStore {
  @observable count = 0;

  @action increment() {
  	this.count++;
  }

  @action decrement() {
  	this.count--;
  }

  @action incrementAsync() {
    setTimeout(() => {
      runInAction('Timeout increment', () => { this.count++; }, this);
    }, 1000);
  }
}
