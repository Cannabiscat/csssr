import React, { PureComponent } from 'react';
import UsernameInput from './UsernameInput';
import RepoInput from './RepoInput';
import IssueList from './IssueList';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: 'none',
      reponame: 'none',
      repoArray: [],
      issueArray: [],
    };
  }
  getData = (response) => {
    this.setState({
      repoArray: [],
      issueArray: [],
    });
    this.setState({ ...response });
  }
  requestStatus() {
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
  }
  render() {
    return (
      <div className='app'>
        <h1>Github Issue Viewer</h1>
        <div className='input-container'>
          <UsernameInput
            receive={this.getData}
            requestStatusHandler={this.requestStatus}
          />
          <RepoInput
            receive={this.getData}
            repos={this.state.repoArray}
            repoOwner={this.state.username}
            requestStatusHandler={this.requestStatus}
          />
        </div>
        <IssueList
          issues={this.state.issueArray}
          repoOwner={this.state.username}
          repo={this.state.reponame}
        />
      </div>
    );
  }
}
