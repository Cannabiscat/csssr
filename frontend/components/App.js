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
  render() {
    return (
      <div className='app'>
        <h1>Github Issue Viewer</h1>
        <div className='input-container'>
          <UsernameInput inFunction={this.getData} />
          <RepoInput
            inFunction={this.getData}
            repos={this.state.repoArray}
            repoOwner={this.state.username}
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
