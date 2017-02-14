import React, { PureComponent } from 'react';

export default class IssueList extends PureComponent {
  render() {
    const issues = this.props.issues.length > 0 ?
      this.props.issues.map(item =>
        <li key={item.idList} className='issue-item'>
          <div className='issue-head'><img src={item.user.avatar_url} alt='avatar' width='50px' /> <a className='user-url' href={item.user.html_url}>{item.user.login}</a></div>
          <p className='issue-title'>{item.title}</p>
          <div className='issue-body'>{item.body}</div>
        </li>)
      : <p className='no-issues'>There is no issues</p>;
    const ownerUrl = `http://github.com/${this.props.repoOwner}`;
    const repoUrl = `${ownerUrl}/${this.props.repo}`;
    const header = this.props.issues.length > 0 ?
      (<p>Issue list of <a href={ownerUrl}>
        {this.props.repoOwner}/
      </a>
        <a href={repoUrl}>
          {this.props.repo}
        </a> repository</p>)
      : '';
    return (
      <div>
        {header}
        <ul>{issues}</ul>
      </div>
    );
  }
}
IssueList.propTypes = {
  issues: React.PropTypes.array,
  repoOwner: React.PropTypes.string,
  repo: React.PropTypes.string,
};