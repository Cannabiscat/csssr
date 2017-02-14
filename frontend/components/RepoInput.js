import React, { PureComponent } from 'react';

export default class RepoInput extends PureComponent {
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
        this.props.receive({
          issueArray: JSON.parse(event.target.response).map((item, index) => {
            const newItem = { ...item, idList: index };
            return newItem;
          }),
          reponame: value,
        });
      },
    };
  }
  handleOnBlur = (event) => {
    event.persist();
    if (event.target.value.trim() !== '') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.github.com/repos/${this.props.repoOwner}/${event.target.value}/issues?r=${Math.random(100)}`);
      Object.keys(this.listeners).map((item) => {
        xhr.addEventListener(item.toString(), this.listeners[item](event.target.value), false);
        return item;
      });
      xhr.send();
    }
  }
  render() {
    const reposList = this.props.repos.map((item, index) => {
      return {
        reponame: item.full_name.substr(this.props.repoOwner.length + 1),
        id: index,
      };
    }).map(item => <option key={item.id} value={item.reponame} />);
    return (
      <div className='input-area' id='repository-input'>
        <datalist id='repositories'>
          {reposList}
        </datalist>
        <input type='text' list='repositories' onBlur={this.handleOnBlur} placeholder="Name of Github user's repo" />
        <span className='requestStatus'>{this.props.requestStatusHandler.call(this)}</span>
      </div>
    );
  }
}
RepoInput.propTypes = {
  repos: React.PropTypes.array,
  repoOwner: React.PropTypes.string,
  receive: React.PropTypes.func.isRequired,
  requestStatusHandler: React.PropTypes.func.isRequired,
};