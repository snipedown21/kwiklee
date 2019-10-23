import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { SERVER_NAME_STRING, ARTIFACT_NAME_STRING } from '../constants';

class ServerForm extends React.Component {
  state = {
    serverName: '',
    artifactName: ''
  }

  handleNext = () => {
    localStorage.setItem('serverName', this.state.serverName);
    localStorage.setItem('artifactName', this.state.artifactName);
    this.props.history.push('/serverpipeline');
  };

  render() {

    const isNextDisabled = this.state.serverName === '' ||
      this.state.artifactName === '' ? 'disabled' : '';

    return (
      <div className="container">
        <div style={{ marginTop: '15%' }} className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id="serverName"
              value={this.state.serverName}
              onChange={e => this.setState({ serverName: e.target.value })}
            />
            <label htmlFor="serverName">{SERVER_NAME_STRING}</label>
        </div>
        </div>
        <div style={{ marginTop: '10%' }} className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id="artifactName"
              value={this.state.artifactName}
              onChange={e => this.setState({ artifactName: e.target.value })}
            />
            <label htmlFor="artifactName">{ARTIFACT_NAME_STRING}</label>
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={this.handleNext} className={`btn-floating waves-effect waves-light btn-theme ${isNextDisabled}`}><i className="material-icons">arrow_forward</i></button>
        </div>
      </div>
    );
  }
}

export default withRouter(ServerForm);
