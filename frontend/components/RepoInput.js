import React, { PureComponent } from 'react';

export default class RepoInput extends PureComponent {
  constructor() {
    super();
    this.state = {
      issues: [],
    };
  }
  onClickRef = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/repos/${this.props.name}/${event.target.value}/issues`)
      .then(r => r.json())
      .then((data) => {
        this.setState({
          issues: data.map((item, index) => {
            const newItem = { ...item, idList: index };
            return newItem;
          }),
        });
      });
  }
  render() {
    const test = this.props.repos.map((item, index) => {
      return {
        reponame: item.full_name.substr(this.props.name.length + 1),
        id: index,
      };
    });
    const testList = test.map(item => <option key={item.id} value={item.reponame} />);
    const issues = this.state.issues.length > 0 ?
      this.state.issues.map(item =>
        <li key={item.idList}>
          <h3>{item.title}</h3>
          <div>{item.body}</div>
        </li>)
      : <p>There is no issues</p>;
    return (
      <div>
        <datalist id='repositories'>
          {testList}
        </datalist>
        <input type='text' list='repositories' onBlur={this.onClickRef} />
        <div>
          <ul>{issues}</ul>
        </div>
      </div>
    );
  }
}
RepoInput.propTypes = {
  repos: React.PropTypes.array,
  name: React.PropTypes.string,
};