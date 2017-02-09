import React, { PureComponent } from 'react';
import Comps from './Comps';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      user: 'Alex Vyatkin',
    };
  }
  render() {
    return (
      <div className='app'>
        <h1>Hi! I am The App!</h1>
        <Comps user={this.state.user} />
      </div>
    );
  }
}
