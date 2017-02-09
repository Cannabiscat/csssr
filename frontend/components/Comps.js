import React, { PureComponent } from 'react';
import RepoInput from './RepoInput';

export default class Comps extends PureComponent {
  constructor() {
    super();
    this.state = { response: {}, repos: [], status: true, name: 'none' };
    this.handleBlur = this.handleBlur.bind(this);
  }
  componentDidMount() {
    this.input.focus();
  }
  componentDidUpdate() {
  }
  handleBlur(event) {
    this.setState({ name: event.target.value });
    if (this.state.status) {
      fetch(`https://api.github.com/users/${event.target.value}/repos`)
        .then(r => r.json())
        .then((data) => {
          this.setState({ repos: data });
        });
    }
  }
  render() {
    return (
      <div>
        <input type='text' placeholder={this.props.user} ref={(ref) => { this.input = ref; }} onBlur={this.handleBlur} />
        Status: {this.state.status.toString()}
        <RepoInput repos={this.state.repos} name={this.state.name} />
      </div>
    );
  }
}
Comps.propTypes = {
  user: React.PropTypes.string.isRequired,
};
