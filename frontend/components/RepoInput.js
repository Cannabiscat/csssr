import React, { PureComponent } from 'react';

export default class RepoInput extends PureComponent {
  // constructor() {
  //   super();
  // }

  render() {
    const test = this.props.repos.map(item => item.full_name.substr(this.props.name.length + 1));
    const testList = test.map(item => <option value={item} />);
    return (
      <div>
        <datalist id='repositories'>
          {testList}
        </datalist>
        <input type='text' list='repositories' />
      </div>
    );
  }
}
RepoInput.propTypes = {
  repos: React.PropTypes.Array,
  name: React.PropTypes.String,
};