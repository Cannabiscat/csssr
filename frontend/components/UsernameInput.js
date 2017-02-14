import React, { PureComponent } from 'react';
// import RepoInput from './RepoInput';

export default class UsernameInput extends PureComponent {
  constructor() {
    super();
    this.state = {
      requestStatus: null,
    };
    this.listeners = {
      loadstart: () => () => {
        this.setState({ requestStatus: 'start' });
      },
      load: value => (event) => {
        const status = event.target.status === 200 ? 'loaded' : 'error';
        this.setState({ requestStatus: status });
        this.props.inFunction({
          repoArray: JSON.parse(event.target.response),
          username: value,
        });
      },
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleOnBlur = (event) => {
    event.persist();
    if (event.target.value.trim() !== '') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.github.com/users/${event.target.value}/repos?r=${Math.random(100)}`);
      Object.keys(this.listeners).map((item) => {
        xhr.addEventListener(item.toString(), this.listeners[item](event.target.value), false);
        return item;
      });
      xhr.send();
    }
  }

  render() {
    const requestStatus = () => {
      switch (this.state.requestStatus) {
        case 'loaded':
          return (<img src='../../img/success.png' alt='success' />);
        case 'start':
          return (<img src='../../img/35.gif' alt='loading' />);
        case 'error':
          return (<img src='../../img/error.png' alt='error' />);
        default:
          return ('');
      }
    };
    return (
      <div className='input-area' id='username-input'>
        <input type='text' placeholder='Name of Github user' ref={(ref) => { this.input = ref; }} onBlur={this.handleOnBlur} />
        <span className='requestStatus'>{requestStatus()}</span>
      </div>
    );
  }
}
UsernameInput.propTypes = {
  inFunction: React.PropTypes.func.isRequired,
};