import React, { PureComponent } from 'react';

export class Comps extends PureComponent {
  render() {
    return (
      <input type='text' placeholder='Github User' name='user' />
    );
  }
}

export class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <h1>Hi! I am The App!</h1>
        <Comps />
      </div>
    );
  }
}
