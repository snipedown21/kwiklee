import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPipelines } from '../actions';
import {
  APP_NAME,
  APP_TAG_LINE,
  CREATE_A_SERVER_INSTANCE } from '../constants';

class Home extends React.Component {
  componentDidMount() {
    localStorage.clear();
    this.props.resetPipelines();
  }

  render() {
    return (
      <div className="container row margintop">
      <div className="col s12">
        <div className="card red lighten-5">
          <div className="card-content">
            <span className="card-title">{APP_NAME} - {APP_TAG_LINE}</span>
            <p>
            Spin up servers using Kwiklee to generate <b><i>a fully RESTful mock data server in less than
            30 seconds</i></b>, seriously!!</p>
            <br />
            <p>To get started, click on the link below.</p>
          </div>
          <div className="card-action justify-items">
            <Link className="link-color red-text" to="/servercreate">{CREATE_A_SERVER_INSTANCE}</Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(null, { resetPipelines })(Home);
