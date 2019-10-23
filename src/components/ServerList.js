import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  CONSTANT_SERVER_PROJECT_PATH,
  NO_SERVER_INSTANCES_FOUND_STRING } from '../constants';


class ServerList extends React.Component {
  componentDidMount() {
    this.props.fetchMockServers();
  }

  handleOpen = (server) => {
    this.props.handleServerOpen(server);
  }

  handleDelete = (server) => {
    this.props.handleServerDelete(server);
    this.props.fetchMockServers();
  }

  renderServerList = () => {
    if(this.props.mockServers.length === 0) {
        return (
          <div style={{ textAlign: 'center', fontSize: '30px', fontStyle: 'italic', color: '#ee6e73' }}>
            {NO_SERVER_INSTANCES_FOUND_STRING}
          </div>
        );
    }

    return this.props.mockServers.map(item => {
      return (
        <li key={item} className="collection-item avatar">
          <i className="material-icons circle">folder</i>
          <span className="title">{item}</span>
          <p>{CONSTANT_SERVER_PROJECT_PATH}</p>
          <div className="secondary-content right">
          <button onClick={() => this.handleOpen(item)} className="btn-floating waves-effect waves-light button-style green">
            <i className="material-icons" style={{ cursor: 'pointer' }}>remove_red_eye</i>
          </button>
          <button onClick={() => this.handleDelete(item)} className="btn-floating waves-effect waves-light button-style red">
            <i className="material-icons" style={{ cursor: 'pointer' }}>delete</i>
          </button>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="container">
      <ul className="collection">
      {this.renderServerList()}
      </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mockServers: state.mockServers
  };
}

export default connect(mapStateToProps, actions)(ServerList);
