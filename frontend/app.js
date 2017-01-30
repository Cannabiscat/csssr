import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Comps from './component';

class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <h1>Hi!! I am The App!!</h1>
        <Comps />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
