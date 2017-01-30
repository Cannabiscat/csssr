import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class App extends PureComponent {
  render() {
    return <h1>Hi!! I am The App!!</h1>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
